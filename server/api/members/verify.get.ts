import { authenticationCodeGenerator } from '~~/server/utils/nanoid';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  let phoneNumber: string;

  if (event.context.auth) {
    phoneNumber = event.context.auth.phoneNumber;
  } else {
    phoneNumber = (useQuery(event) as { phoneNumber: string }).phoneNumber;
  }

  try {
    const pin = await prisma.authCode.findUnique({ where: { phoneNumber } });
    if (pin) {
      if (pin.expiresAfter.getTime() > Date.now()) {
        return {
          ok: true,
          data: {
            expiresAfter: pin.expiresAfter.toString(),
          },
        };
      }
      const { expiresAfter } = await prisma.authCode.update({
        where: { phoneNumber },
        data: {
          pin: authenticationCodeGenerator(),
          expiresAfter: new Date(Date.now() + 10 * 1000),
        },
      });

      return {
        ok: true,
        data: {
          expiresAfter: expiresAfter.toString(),
        },
      };
    }

    const { expiresAfter } = await prisma.authCode.create({
      data: {
        phoneNumber,
        expiresAfter: new Date(Date.now() + 10 * 1000),
        pin: authenticationCodeGenerator(),
      },
    });

    return {
      ok: true,
      data: {
        expiresAfter: expiresAfter.toString(),
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});

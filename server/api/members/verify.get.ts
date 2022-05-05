import { authenticationCodeGenerator } from '~~/server/utils/nanoid';
import prisma from '~~/server/utils/prisma';
import sms from '~~/server/utils/sms';

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
      const {
        expiresAfter,
        pin: code,
        phoneNumber: to,
      } = await prisma.authCode.update({
        where: { phoneNumber },
        data: {
          pin: authenticationCodeGenerator(),
          expiresAfter: new Date(Date.now() + 300 * 1000),
        },
      });

      // await sms.sendAuthCode(to, code);

      return {
        ok: true,
        data: {
          expiresAfter: expiresAfter.toString(),
        },
      };
    }

    const {
      expiresAfter,
      pin: code,
      phoneNumber: to,
    } = await prisma.authCode.create({
      data: {
        phoneNumber,
        expiresAfter: new Date(Date.now() + 300 * 1000),
        pin: authenticationCodeGenerator(),
      },
    });

    // await sms.sendAuthCode(to, code);

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

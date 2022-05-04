import { authenticationCodeGenerator } from '~~/server/utils/nanoid';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (req: CompatibilityEvent) => {
  let phoneNumber: string;
  if (req.context.auth) {
    phoneNumber = req.context.auth.phoneNumber;
  } else {
    phoneNumber = (useQuery(req) as { phoneNumber: string }).phoneNumber;
  }

  const pin = await prisma.authCode.findUnique({ where: { phoneNumber } });
  if (pin) {
    if (pin.expiresAfter.getTime() > Date.now()) {
      return pin.expiresAfter;
    }
    const { expiresAfter } = await prisma.authCode.update({
      where: { phoneNumber },
      data: {
        pin: authenticationCodeGenerator(),
        expiresAfter: new Date(Date.now() + 300 * 1000),
      },
    });

    return expiresAfter;
  }

  const { expiresAfter } = await prisma.authCode.create({
    data: {
      phoneNumber,
      expiresAfter: new Date(Date.now() + 180 * 1000),
      pin: Math.random().toString(20).substring(2, 7),
    },
  });
  return expiresAfter;
});

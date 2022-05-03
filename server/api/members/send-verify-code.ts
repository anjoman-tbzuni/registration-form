import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (req: CompatibilityEvent) => {
  const { phoneNumber } = useQuery(req) as { phoneNumber: string };

  const pin = await prisma.authCode.findUnique({ where: { phoneNumber } });
  if (pin) {
    return pin.expiresAfter;
  }

  const { expiresAfter } = await prisma.authCode.create({
    data: {
      phoneNumber,
      expiresAfter: new Date(Date.now() + 20 * 1000),
      pin: Math.random().toString(20).substring(2, 7),
    },
  });
  return expiresAfter;
});

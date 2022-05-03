import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (req: CompatibilityEvent) => {
  const { phoneNumber } = useQuery(req) as { phoneNumber: string };

  const { expiresAfter } = await prisma.authCode.update({
    where: { phoneNumber },
    data: {
      pin: Math.random().toString(20).substring(2, 7),
      expiresAfter: new Date(Date.now() + 20 * 1000),
    },
  });

  return expiresAfter;
});

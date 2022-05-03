import jwt from '~~/server/utils/jwt';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (req: CompatibilityEvent) => {
  const { token } = useQuery(req) as { token: string };

  const { phoneNumber } = jwt.verifyToken(token) as Payload;
  return await prisma.member.findUnique({ where: { phoneNumber } });
});

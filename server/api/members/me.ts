import jwt from '~~/server/utils/jwt';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(
  async (req: CompatibilityEvent): Promise<Member> => {
    const { token } = useQuery(req) as { token: string };

    const { email } = jwt.verifyToken(token) as CreateMember;
    return await prisma.member.findUnique({ where: { email } });
  },
);

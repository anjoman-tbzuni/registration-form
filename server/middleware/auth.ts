import jwt from '../utils/jwt';
import prisma from '../utils/prisma';

export default defineEventHandler(async (event: CompatibiliyEvent) => {
  const cookies = useCookies(event);
  const accessToken = cookies['access_token'];

  if (accessToken) {
    const { phoneNumber } = jwt.verifyToken(accessToken);
    const member = await prisma.member.findUnique({
      where: {
        phoneNumber,
      },
    });
    event.context.auth = member;
  }
});

import jwt from '~~/server/utils/jwt';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (req: CompatibilityEvent) => {
  const { email, name, phoneNumber, familyName, studentNumber } =
    (await useBody(req)) as CreateMember;

  let member = await prisma.member.findUnique({ where: { email } });

  if (!member) {
    member = await prisma.member.create({
      data: {
        name,
        familyName,
        phoneNumber,
        email,
        studentNumber,
      },
    });
  }

  const accessToken = jwt.signPayload({
    email: member.email,
  });
  setCookie(req, 'access_token', accessToken, {
    secure: true,
  });
  return accessToken;
});

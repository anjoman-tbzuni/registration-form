import jwt from '~~/server/utils/jwt';
import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const { email, name, phoneNumber, familyName, studentNumber } =
      (await useBody(event)) as CreateMember;

    let member = await prisma.member.findUnique({ where: { phoneNumber } });
    if (member) {
      return {
        ok: false,
        error: 'شما قبلا ثبت نام کرده اید.',
      };
    }

    member = await prisma.member.create({
      data: {
        name,
        familyName,
        phoneNumber,
        email,
        studentNumber,
      },
    });

    const accessToken = jwt.signPayload({
      phoneNumber: member.phoneNumber,
    });

    setCookie(event, 'access_token', accessToken, {
      secure: true,
    });

    return {
      ok: true,
      data: member,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});

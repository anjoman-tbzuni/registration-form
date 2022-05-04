import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { pin: givenPin } = await useBody(event);
  const { phoneNumber } = event.context.auth;

  try {
    const { pin: savedPin } = await prisma.authCode.findUnique({
      where: { phoneNumber },
    });

    if (givenPin === savedPin) {
      await prisma.member.update({
        where: { phoneNumber },
        data: { verifiedPhoneNumber: true },
      });

      return {
        ok: true,
        error: null,
        message: 'احراز هویت موفقیت آمیز بود.',
      };
    }

    return {
      ok: false,
      error: 'کد وارد شده اشتباه است.',
      message: null,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
      message: null,
    };
  }
});

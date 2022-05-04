import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const { pin: givenPin } = useBody(event);
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
        error: null,
        message: 'احراز هویت موفقیت آمیز بود.',
      };
    }

    return {
      error: 'کد وارد شده اشتباه است.',
      message: null,
    };
  } catch (err) {
    return {
      error: err.message,
      message: null,
    };
  }
});

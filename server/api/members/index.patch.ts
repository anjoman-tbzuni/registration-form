import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  try {
    const body: UpdateProfile = await useBody(event);
    await prisma.member.update({
      where: {
        phoneNumber: event.context.auth.phoneNumber as string,
      },
      data: body,
    });

    return {
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});

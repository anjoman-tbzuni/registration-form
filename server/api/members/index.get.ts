import prisma from '~~/server/utils/prisma';

export default defineEventHandler(async () => {
  try {
    const members = await prisma.member.findMany();
    return {
      ok: true,
      data: {
        members,
      },
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message,
    };
  }
});

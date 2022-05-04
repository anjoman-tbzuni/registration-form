export default defineEventHandler(async (event) => {
  if (event.context.auth) {
    return {
      ok: true,
      data: event.context.auth,
    };
  }

  return {
    ok: false,
    error: `you're not loged in`,
  };
});

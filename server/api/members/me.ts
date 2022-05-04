export default defineEventHandler(async (req: CompatibilityEvent) => {
  if (req.context.auth) {
    return req.context.auth;
  }
  return null;
});

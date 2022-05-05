export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.params.phone) {
    return true;
  }

  return navigateTo('/');
});

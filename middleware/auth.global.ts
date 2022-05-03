export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('access_token');

  if (token.value) {
    const member = (await $fetch(
      `/api/members/me?token=${token.value}`,
    )) as Member;
    if (member) {
      to.params = {
        token: token.value,
        ...member,
      };
    } else {
      to.params = {
        token: token.value,
      };
    }
  }

  navigateTo('/');
});

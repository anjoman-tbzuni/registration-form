export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();

  const member = await $fetch(`/api/members/me?token=${to.params.token}`);
  if (member) {
    navigateTo('/');
  }
  router.push('/login');
});

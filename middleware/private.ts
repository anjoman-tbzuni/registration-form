export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter();

  if (to.params.studentNumber) {
    navigateTo('/');
  }
  router.push('/login');
});

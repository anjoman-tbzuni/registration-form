export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('private');
  const router = useRouter();

  if (to.params.studentNumber) {
    navigateTo('/');
  }
  router.push('/login');
});

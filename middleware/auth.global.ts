import { useMemberStore } from '@/store/member';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('access_token');
  const memberStore = useMemberStore();

  if (token.value) {
    const member = (await $fetch(
      `/api/members/me?token=${token.value}`,
    )) as Member;
    memberStore.$patch({
      ...member,
    });
  }

  navigateTo('/');
});

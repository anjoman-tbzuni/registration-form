import { useMemberStore } from '@/store/member';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const memberStore = useMemberStore();

  const member = (await $fetch(`/api/members/me`, {
    headers: useRequestHeaders(['cookie']),
  })) as Member;

  if (member) {
    memberStore.$patch({
      ...member,
    });
  }

  navigateTo('/');
});

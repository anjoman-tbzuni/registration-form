import { useMemberStore } from '@/store/member';
import { Member } from '@prisma/client';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const memberStore = useMemberStore();

  const data = await $fetch<ResponseData<Member>>(`/api/members/me`, {
    headers: useRequestHeaders(['cookie']),
  });

  if (data.ok) {
    memberStore.$patch({
      ...data.data,
    });
  }

  navigateTo('/');
});

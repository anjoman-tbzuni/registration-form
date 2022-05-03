<script lang="ts" setup>
import { useMemberStore } from '@/store/member';

const memberStore = useMemberStore();
</script>

<template>
  <div class="flex flex-col mt-5">
    <MemberRegister v-if="!memberStore.phoneNumber" />
    <MemberProfile v-else />
  </div>
</template>

<style lang="postcss" scoped>
li {
  @apply mx-2 px-2 text-blue-700;
}
</style>

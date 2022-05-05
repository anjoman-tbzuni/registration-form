<script lang="ts" setup>
import { useMemberStore } from '@/store/member';
const showWaitText = ref(false);

const changeState = (to: boolean) => {
  showWaitText.value = to;
};

const memberStore = useMemberStore();
</script>

<template>
  <div class="flex flex-col mt-5">
    <MemberRegister
      v-if="!memberStore.phoneNumber"
      @registered="changeState(true)"
    />
    <MemberVerifyPhone
      v-else-if="!memberStore.verifiedPhoneNumber"
      @sended="changeState(false)"
    />
    <MemberProfile v-else-if="memberStore.verifiedPhoneNumber" />

    <p v-if="showWaitText" class="text-base font-light text-slate-800">
      لطفا منتظر بمانید...
    </p>
  </div>
</template>

<style lang="postcss" scoped>
li {
  @apply mx-2 px-2 text-blue-700;
}
</style>

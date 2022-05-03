<template>
  <div class="main">
    <div class="row">
      <label>نام:</label>
      <p>{{ memberStore.name }}</p>
    </div>
    <div class="row">
      <label>نام خانوادگی: </label>
      <p>{{ memberStore.familyName }}</p>
    </div>
    <div class="row">
      <label>شماره دانشجویی:</label>
      <p>{{ memberStore.studentNumber }}</p>
    </div>
    <div class="row">
      <label>شماره تماس:</label>
      <p>{{ memberStore.phoneNumber }}</p>
    </div>
    <div class="row">
      <label>ایمیل:</label>
      <p>{{ memberStore.email }}</p>
    </div>
    <div v-if="!memberStore.verifiedPhoneNumber">
      <div v-if="!readyToVerify">
        <div class="flex flex-row mt-3">
          <Icon icon="emojione:warning" />
          <p class="text-xs pr-1">
            لطفا برای تایید شماره تماس خود اقدام بفرمایید.
          </p>
        </div>
        <button
          :class="
            sending
              ? 'bg-slate-200 text-slate-700 text-sm'
              : 'bg-slate-700 text-sm hover:bg-slate-900 text-slate-200'
          "
          @click="goVerify"
        >
          {{ sending ? 'لطفا صبر کنید.' : 'تایید شماره تلفن' }}
        </button>
      </div>
      <MemberVerifyPhone v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useMemberStore } from '@/store/member';
import { useAuthCodeStore } from '@/store/auth-code';

const memberStore = useMemberStore();
const authcodeStore = useAuthCodeStore();
const readyToVerify = ref(false);
const sending = ref(false);

const goVerify = async () => {
  sending.value = true;
  const pinExpiers = await $fetch(
    `/api/members/send-verify-code?phoneNumber=${memberStore.phoneNumber}`,
  );
  authcodeStore.expiresAfter = pinExpiers;
  readyToVerify.value = true;
  sending.value = false;
};
</script>

<style lang="postcss" scoped>
.main {
  @apply flex flex-col text-base;
}

.row {
  @apply flex flex-row my-1;
}

label {
  @apply text-slate-700 pl-2;
}

p {
  @apply text-slate-900;
}

button {
  @apply rounded-lg mt-2 max-h-10;
}
</style>

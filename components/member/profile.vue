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
      <MemberVerifyPhone
        @resend="resend"
        @verify="verify"
        :timeLeft="timeLeft"
        :mins="mins"
        :secs="secs"
        :pending="pending"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMemberStore } from '@/store/member';

const memberStore = useMemberStore();
const readyToVerify = ref(false);

const { data, refresh, pending } = await useAsyncData(
  `/api/members/send-verify-code`,
  () =>
    $fetch('/api/members/send-verify-code', {
      headers: useRequestHeaders(['cookie']),
    }),
);
readyToVerify.value = true;

const pinExpires = ref(new Date(data.value).getTime());
const now = ref(new Date().getTime());
const timeLeft = ref(pinExpires.value - now.value);
const mins = ref(Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)));
const secs = ref(Math.floor((timeLeft.value % (1000 * 60)) / 1000));

const timer = () => {
  setTimeout(() => {
    now.value = new Date().getTime();
    timeLeft.value = pinExpires.value - now.value;
    if (timeLeft.value > 0) {
      mins.value = Math.floor(
        (timeLeft.value % (1000 * 60 * 60)) / (1000 * 60),
      );
      secs.value = Math.floor((timeLeft.value % (1000 * 60)) / 1000);
    }
    timer();
    pending.value = false;
  }, 1000);
};

timer();

const resend = async () => {
  await refresh();
  pinExpires.value = new Date(data.value).getTime();
  pending.value = true;
};

const verify = async (pin: string) => {
  console.log('verify', pin);
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

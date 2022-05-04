<template>
  <div class="main">
    <h1 class="my-2">اطلاعات ثبت نام</h1>
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

    <div class="mt-3" v-if="!memberStore.verifiedPhoneNumber">
      <MemberVerifyPhone
        @resend="resend"
        @verify="verify"
        :timeLeft="timeLeft"
        :mins="mins"
        :secs="secs"
        :pending="pending"
      />
    </div>

    <div
      v-if="logs.error.length || logs.message.length"
      class="mt-2 p-1 text-sm logs"
    >
      <p v-if="logs.error.length" class="error">
        {{ logs.error }}
      </p>
      <p v-if="logs.message.length" class="message">
        {{ logs.message }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMemberStore } from '@/store/member';

const memberStore = useMemberStore();
const logs = reactive({
  error: '',
  message: '',
});

const { data, refresh, pending } = await useAsyncData<
  ResponseData<SendTokenResponse>
>(`/api/members/verfiy`, () =>
  $fetch('/api/members/verify', {
    headers: useRequestHeaders(['cookie']),
  }),
);

const pinExpires = ref(new Date(data.value.data.expiresAfter).getTime());
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
  pinExpires.value = new Date(data.value.data.expiresAfter).getTime();
  pending.value = true;
};

const verify = async (pin: string) => {
  const { data } = await useFetch<ResponseData<undefined>>(
    '/api/members/verify',
    {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: {
        pin,
      },
    },
  );

  if (data.value.ok) {
    logs.error = '';
    logs.message = data.value.message;
    setTimeout(() => location.reload(), 1000);
  } else {
    logs.error = data.value.error;
    logs.message = '';
  }
};
</script>

<style lang="postcss" scoped>
.main {
  @apply flex flex-col text-base last:border-b-0;
}

.row {
  @apply border-b flex flex-row py-3 border-slate-200;
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

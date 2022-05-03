<template>
  <div>
    <div class="flex flex-row mt-3">
      <Icon icon="emojione:warning" />
      <p class="text-xs pr-1">
        کد تایید ارسال شده است. لطفا صفحه را ریلود نکنید.
      </p>
    </div>

    <FormKit
      type="text"
      v-model="pin"
      help="کد ارسال شده ۵ رقمی را در قسمت بالا وارد نمایید."
      placeholder="code"
      :classes="{
        outer: 'mb-0 mt-3',
        inner:
          'w-full border border-gray-300 rounded-lg mb-1 overflow-hidden focus-within:border-blue-300',
        input:
          'w-full tracking-widest h-10 px-3 border-none text-base text-center text-gray-700 placeholder-gray-400',
        help: 'text-xs text-gray-500',
        message: 'text-xs text-red-500',
      }"
    />

    <div class="grid grid-cols-2 divide-x gap-2 text-sm mt-3">
      <button
        @click="resendAuthcode"
        :disabled="timeLeft > 0"
        :class="
          timeLeft <= 0
            ? 'button text-slate-200 bg-slate-700 hover:bg-slate-800'
            : 'button text-slate-400 bg-slate-200'
        "
      >
        <p class="pl-2">ارسال مجدد</p>
        <Icon icon="uil:comment-alt-redo" />
        <p class="pr-2">
          {{ timeLeft <= 0 ? '' : `${e2p(mins)}:${e2p(secs)}` }}
        </p>
      </button>

      <button
        @click="verifyAuthcode"
        :disabled="timeLeft <= 0 && pin.length !== 5"
        :class="
          pin.length === 5 && timeLeft > 0
            ? 'button text-slate-200 bg-slate-700 hover:bg-slate-800'
            : 'button text-slate-400 bg-slate-200'
        "
      >
        <p>تایید کد</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useAuthCodeStore } from '@/store/auth-code';
import { useMemberStore } from '~~/store/member';

const e2p = (s: number) => s.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

const pin = ref('');
const authcodeStore = useAuthCodeStore();
const memberStore = useMemberStore();

const pinExpires = ref(new Date(authcodeStore.expiresAfter).getTime());
const now = ref(new Date().getTime());
const timeLeft = ref(pinExpires.value - now.value);
const mins = ref(Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)));
const secs = ref(Math.floor((timeLeft.value % (1000 * 60)) / 1000));

const timer = setInterval(() => {
  now.value = new Date().getTime();
  timeLeft.value = pinExpires.value - now.value;
  if (timeLeft.value > 0) {
    mins.value = Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60));
    secs.value = Math.floor((timeLeft.value % (1000 * 60)) / 1000);
  }
}, 1000);

const resendAuthcode = async () => {
  const expiresAfter = await $fetch(
    `/api/members/resend-auth-code?phoneNumber=${memberStore.phoneNumber}`,
  );
  authcodeStore.expiresAfter = expiresAfter;
  pinExpires.value = new Date(expiresAfter).getTime();
};

const verifyAuthcode = () => {
  console.log('verify');
};
</script>

<style lang="postcss" scoped>
.button {
  @apply flex flex-row justify-center py-2 rounded-lg cursor-pointer;
}
</style>

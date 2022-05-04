<template>
  <div>
    <div class="flex flex-row mt-3">
      <Icon icon="emojione:warning" />
      <p class="text-xs pr-1">لطفا احراز هویت را تکیمل کنید.</p>
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
          timeLeft <= 0 && !pending
            ? 'button text-slate-200 bg-slate-700 hover:bg-slate-800'
            : 'button text-slate-400 bg-slate-200'
        "
      >
        <p v-if="pending">لطفا کمی صبر کنید</p>
        <div v-else class="flex flex-row">
          <p v-if="timeLeft > 0" class="pl-2 w-10">
            {{ `${e2p(mins)}:${e2p(secs)}` }}
          </p>
          <p class="pl-2">ارسال مجدد</p>
          <Icon icon="uil:comment-alt-redo" />
        </div>
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

const e2p = (s: number) => s.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

const pin = ref('');
const emit = defineEmits(['resend', 'verify']);
const props = defineProps(['mins', 'secs', 'timeLeft', 'pending']);

const { mins, secs, timeLeft, pending } = toRefs(props);

const resendAuthcode = async () => {
  emit('resend');
};

const verifyAuthcode = () => {
  emit('verify', pin);
};
</script>

<style lang="postcss" scoped>
.button {
  @apply flex flex-row justify-center py-2 rounded-lg cursor-pointer;
}
</style>

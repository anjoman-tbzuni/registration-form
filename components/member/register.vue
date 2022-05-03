<template>
  <div>
    <h2>ثبت نام</h2>
    <FormKit
      type="form"
      v-model="data"
      submit-label="ثبت نام"
      :classes="{
        actions:
          'bg-slate-800 text-center text-slate-100 rounded-xl text-sm hover:bg-slate-900 transition cursor-pointer',
        message: 'text-xs text-red-500 pb-2',
      }"
      incomplete-message="لطفا اطلاعات وارد شده را اصلاح کنید."
      :config="{ validationVisibility: 'submit' }"
    >
      <FormKit
        type="text"
        name="name"
        placeholder="نام"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required"
        :validation-messages="{
          required: 'لطفا نام خود را وارد کنید.',
        }"
      />

      <FormKit
        type="text"
        name="email"
        placeholder="نام خانوادگی"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required"
        :validation-messages="{
          required: 'لطفا نام خانوادگی خود را وارد کنید.',
        }"
      />

      <FormKit
        type="text"
        name="email"
        placeholder="ایمیل"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required|email"
        :validation-messages="{
          required: 'لطفا ایمل خود را وارد کنید.',
          email: 'ایمل وارد شده سحیح نمیباشد.',
        }"
      />

      <FormKit
        type="text"
        name="studentNumber"
        placeholder="شماره دانشجویی"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required|number|length:9"
        :validation-messages="{
          required: 'لطفا شماره دانشجویی خود را وارد کنید.',
          number: 'شماره دانشجویی وارد شده صحیح نمیباشد.',
          length: 'شماره دانشجویی وارد شده صحیح نمیباشد.',
        }"
      />

      <FormKit
        type="text"
        name="phoneNumber"
        placeholder="شماره تماس"
        :classes="textClasses"
        validation-visibility="submit"
        validation="required|matches:/^[0-9]{3}/|length:11"
        :validation-messages="{
          required: 'لطفا شماره موبایل خود را وارد کنید.',
          matches: 'شماره تماس وارد شده صحیح نمیباشد.',
          length: 'شماره تماس وارد شده صحیح نمیباشد.',
        }"
      />

      <div class="flex flex-row pb-3">
        <Icon icon="emojione:warning" />
        <p class="text-xs pr-1">
          لطفا در ورود اطلاعات دقت کنید. سپس قادر به تغییر این اطلاعات نخواهید
          بود.
        </p>
      </div>
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const data = ref({});

// Classes
const textClasses = {
  outer: 'mb-5',
  inner:
    'w-full border border-gray-300 rounded-lg mb-1 overflow-hidden focus-within:border-blue-300',
  input:
    'w-full h-10 px-3 border-none text-sm text-gray-700 placeholder-gray-400',
  help: 'text-xs text-gray-500',
  message: 'text-xs text-red-500',
};
const submitForm = () => {};
</script>

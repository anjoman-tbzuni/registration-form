<template>
  <div>
    <h2>ثبت نام</h2>
    <FormKit
      type="form"
      v-model="body"
      submit-label="ثبت نام"
      :classes="{
        actions: `text-center rounded-xl text-sm  transition cursor-pointer ${
          pending
            ? 'bg-slate-200 text-slate-800 '
            : 'bg-slate-800 text-slate-100 hover:bg-slate-900'
        } `,
        message: 'text-xs text-red-500 pb-2',
      }"
      incomplete-message="لطفا اطلاعات وارد شده را اصلاح کنید."
      :config="{ validationVisibility: 'submit' }"
      @submit="submitForm"
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
        name="familyName"
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
          email: 'ایمل وارد شده صحیح نمیباشد.',
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

    <ul v-if="errors.length" class="mt-3">
      <li class="text-sm text-red-500" v-for="err in errors" :key="err">
        {{ err }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useMemberStore } from '@/store/member';
import { Member } from '.prisma/client';

interface MemberForm extends Omit<CreateMember, 'studentNumber'> {
  studentNumber: string;
}

const memberStore = useMemberStore();

const body = ref<MemberForm>({} as MemberForm);
const pending = ref(false);
const errors = ref([]);

// Classes
const textClasses = {
  outer: 'mb-5',
  inner:
    'w-full border border-slate-300 rounded-lg mb-1 overflow-hidden focus-within:border-blue-300',
  input:
    'w-full h-10 px-3 border-none text-sm text-gray-700 placeholder-gray-400',
  help: 'text-xs text-gray-500',
  message: 'text-xs text-red-500',
};

const submitForm = async () => {
  pending.value = true;
  const { data } = await useFetch<ResponseData<Member>>('/api/members', {
    method: 'POST',
    body: {
      ...body.value,
      studentNumber: parseInt(body.value.studentNumber),
    },
  });

  if (data.value.ok) {
    memberStore.$patch({
      ...data.value.data,
    });
    pending.value = false;
  } else {
    errors.value.push(data.value.error);
    pending.value = false;
  }
};
</script>

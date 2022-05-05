<template>
  <div>
    <h2 class="mt-3 mb-1">تکمیل اطلاعات</h2>
    <FormKit
      type="form"
      v-model="body"
      submit-label="تکمیل اطلاعات"
      :classes="{
        actions:
          'bg-slate-800 text-center text-slate-100 rounded-xl text-sm hover:bg-slate-900 transition cursor-pointer',
        message: 'text-xs text-red-500 pb-2',
      }"
      incomplete-message="لطفا اطلاعات وارد شده را اصلاح کنید."
      :config="{ validationVisibility: 'submit' }"
      @submit="submitForm"
    >
      <div class="border-b">
        <FormKit
          type="checkbox"
          value="false"
          label="خوابگاهی هستید؟"
          name="dormitoryStudent"
          wrapper-class="flex flex-row mb-2"
          inner-class="ml-2"
          label-class="text-sm"
        />

        <FormKit
          v-if="body.dormitoryStudent"
          type="text"
          placeholder="خوابگاه"
          help="در کدام خوابگاه اقامت دارید؟"
          name="dormitory"
          :classes="textClasses"
        />
      </div>

      <FormKit
        type="textarea"
        label="سوابق فعالیت (سیاسی، فراهنگی، اجتماعلی، علمی، اجرایی و ...)"
        cols="30"
        class="border-b"
        placeholder="در صورتی که دارای سابقه فعالیت در گروه، حزب، انجمن، کانون فراهنگی، NGO و... میباشید، لطفاً زمینه فعالیت و مسئولیت خود را در آن نهاد ذکر نمایید."
        :classes="textareaClasses"
      />

      <FormKit
        name="cooperationAreas"
        type="checkbox"
        label="زمینه‌های همکاری"
        :classes="{
          outer:
            'border border-slate-300 rounded-lg p-3 pb-0 mt-8 mb-5 relative text-sm',
          legend:
            'absolute -top-3 bg-slate-50 px-1 right-5 text-sm font-semibold',
          help: 'text-sm text-gray-500 pt-4 pb-3',
          wrapper: 'flex flex-row mb-4 items-center',
          inner: 'flex items-center ml-2',
        }"
        :options="[
          'عقیدتی - سیاسی',
          'فرهنگی - اجتماعی',
          'علمی',
          'اجرایی',
          'تشکیلاتی',
          'اطلاع رسانی (نشریه، سایت و ...)',
        ]"
        help="زمینه‌های همکاری با انجمن اسلامی دانشجویان:"
        validation="required|min:3"
      />

      <FormKit
        type="textarea"
        label="توانمندی‌ها و علاقه مندی‌ها"
        cols="30"
        class="border-b"
        placeholder="چنانچه در زمینه‌های مختلف سیاسی ، فرهنگی ، اجتماعی ، ورزشی ، ادبی ، علمی ، هنری و ... تخصص و توانمندی دارید ذکر نمایید."
        :classes="textareaClasses"
      />
    </FormKit>
    {{ body }}
  </div>
</template>

<script lang="ts" setup>
const textClasses = {
  outer: 'mb-5',
  inner:
    'w-full border border-slate-300 rounded-lg mb-1 overflow-hidden focus-within:border-blue-300',
  input:
    'w-full h-10 px-3 border-none text-sm text-gray-700 placeholder-gray-400',
  help: 'text-xs text-gray-500',
  message: 'text-xs text-red-500',
};

const textareaClasses = {
  outer: 'my-5 ',
  inner:
    'w-full border border-slate-300 rounded-lg mt-2 overflow-hidden focus-within:border-blue-300',
  label: 'text-sm mr-3 font-semibold',
  input:
    'w-full border-none text-sm text-gray-700 placeholder-gray-400 px-3 py-2 text-justify',
};

const body = ref<UpdateProfile>({
  dormitoryStudent: false,
} as UpdateProfile);

const submitForm = async () => {
  const { data } = await useFetch('/api/members', {
    method: 'PATCH',
    body: body.value,
  });
};
</script>

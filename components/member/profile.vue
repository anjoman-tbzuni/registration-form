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

    <NuxtLink
      to="/update-profile"
      class="flex flex-row items-center mt-3 w-fit group text-slate-800 hover:text-slate-900"
    >
      <p class="pl-2 group-hover:pl-3">تکمیل اطلاعات حساب</p>
      <Icon icon="bi:arrow-left" />
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useMemberStore } from '@/store/member';

const memberStore = useMemberStore();
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

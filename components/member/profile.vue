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

    <button class="bg-slate-700 text-slate-200 hover:bg-slate-900">
      <NuxtLink to="/update-profile"> تکمیل اطلاعات </NuxtLink>
    </button>
  </div>
</template>
<script lang="ts" setup>
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

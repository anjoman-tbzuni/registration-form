<template>
  <div class="main">
    <h2 class="my-2">اطلاعات ثبت نام</h2>
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
    <div class="row" v-if="memberStore.dormitory">
      <label>خوابگاه:</label>
      <p>{{ memberStore.dormitory }}</p>
    </div>
    <div class="col" v-if="memberStore.activityRecords">
      <label>سابقه فعالیت:</label>
      <p class="mt-2">{{ memberStore.activityRecords }}</p>
    </div>
    <div class="col" v-if="memberStore.interests">
      <label>علاقه مندی‌ها و توانمندی‌ها:</label>
      <p class="mt-2">{{ memberStore.interests }}</p>
    </div>
    <div class="flex-col py-3" v-if="memberStore.cooperationAreas.length">
      <label>زمینه‌های همکاری: </label>
      <p v-for="area in memberStore.cooperationAreas" :key="area" class="pt-2">
        - {{ area }}
      </p>
    </div>

    <NuxtLink
      to="/update-profile"
      class="flex flex-row items-center mt-3 w-fit group text-slate-800 hover:text-slate-900"
    >
      <p class="border-b border-b-slate-600">تکمیل/اصلاح اطلاعات حساب</p>
      <Icon icon="bi:arrow-left" class="group-hover:mr-3 mr-2" />
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

.col {
  @apply border-b flex flex-col py-3 border-slate-200;
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

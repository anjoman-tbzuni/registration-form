<template>
  <div>
    <MemberUpdate />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['private'],
});
</script>

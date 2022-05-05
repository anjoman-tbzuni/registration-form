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

<style lang="postcss">
textarea {
  @apply p-4 h-32;
}
</style>

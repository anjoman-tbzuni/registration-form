<template>
  <div class="container">
    <div class="nav">
      <!-- <img src="/icon.png" alt="logo" class="w-" /> -->
      <h1 class="text-xl font-medium text-slate-700">
        انجمن اسلامی دانشگاه تبریز
      </h1>
    </div>
    <NuxtPage class="mb-12" />
    <div class="footer group">
      <NuxtLink to="/about" class="w-fit flex flex-row items-center">
        <p>معرفی انجمن</p>
        <Icon icon="bi:arrow-left" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  @apply transition-all;
}

html {
  height: -webkit-fill-available;
}

body {
  @apply bg-slate-50 min-h-screen;
  direction: rtl;
  height: -webkit-fill-available;
  min-height: -webkit-fill-available;
  font-family: 'Vazirmatn', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

.container {
  @apply m-auto max-w-md bg-slate-100 min-h-screen relative flex flex-col p-2;
}

.nav {
  @apply border-slate-300 py-2 text-center border-b flex flex-row items-center justify-center;
  direction: rtl;
}
.footer {
  @apply bottom-1 left-2 right-2 absolute text-slate-800 self-center p-2 border-t border-t-slate-300 text-sm hover:text-slate-900;
  :hover p {
    @apply pl-2;
  }
  p {
    @apply pl-1;
  }
}

h1 {
  @apply text-lg font-medium text-slate-700;
}

h2 {
  @apply text-base font-medium text-slate-700 pt-2 pb-4;
}

button {
  @apply w-full h-full py-2;
}

.logs {
  @apply text-sm;
  .error {
    @apply text-red-500;
  }
  .message {
    @apply text-slate-700;
  }
}
</style>

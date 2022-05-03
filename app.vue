<template>
  <div class="container">
    <div class="nav">
      <!-- <img src="/icon.png" alt="logo" class="w-" /> -->
      <h1 class="text-xl font-medium text-slate-700">
        انجمن اسلامی دانشگاه تبریز
      </h1>
    </div>
    <NuxtPage />
    <div class="footer">
      <NuxtLink to="/about">معرفی انجمن</NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  @apply bg-slate-100;
  font-family: 'Vazirmatn', ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

.container {
  @apply self-center m-auto max-w-md bg-slate-100 min-h-screen relative flex flex-col justify-center p-2 max-h-screen;
}

.nav {
  @apply absolute top-1 left-2 right-2 border-slate-300 m-1 py-2 text-center border-b-2 flex flex-row items-center justify-center;
  direction: rtl;
}

.footer {
  @apply bottom-1 left-2 right-2 absolute bg-slate-800 text-slate-100 m-1 self-center p-2 text-center text-sm rounded-xl hover:bg-slate-900 cursor-pointer transition-all;
}
</style>

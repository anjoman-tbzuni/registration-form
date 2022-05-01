import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  buildModules: ['@vueuse/nuxt'],
  build: {
    transpile: ['@heroicons/vue'],
  },
});

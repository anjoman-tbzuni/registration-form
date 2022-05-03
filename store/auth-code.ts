import { defineStore } from 'pinia';

export const useAuthCodeStore = defineStore('auth-code', {
  state: () => ({
    expiresAfter: null,
  }),
});

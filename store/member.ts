import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', {
  state: () => ({
    name: null,
    familyName: null,
    phoneNumber: null,
    email: null,
    studentNumber: null,
  }),
});

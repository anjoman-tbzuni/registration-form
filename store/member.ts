import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', {
  state: () => ({
    name: undefined as string,
    familyName: undefined as string,
    phoneNumber: undefined as string,
    email: undefined as string,
    studentNumber: undefined as number,
    verifiedPhoneNumber: false,
  }),
});

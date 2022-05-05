import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', {
  state: (): MemberInterface => ({
    name: undefined as string,
    familyName: undefined as string,
    phoneNumber: undefined as string,
    email: undefined as string,
    studentNumber: undefined as number,
    verifiedPhoneNumber: false,
    dormitoryStudent: undefined as boolean,
    dormitory: undefined as string,
    interests: undefined as string,
    cooperationAreas: undefined as string[],
    activityRecords: undefined as string,
    role: undefined as string,
  }),
});

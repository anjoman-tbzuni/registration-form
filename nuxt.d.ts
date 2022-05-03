interface CreateMember {
  studentNumber: number;
  phoneNumber: string;
  email: string;
  name: string;
  familyName: string;
}

interface UpdateMember {
  activityRecords?: string;
}

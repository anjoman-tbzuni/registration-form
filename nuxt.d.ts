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

interface JwtPayload {
  phoneNumber: string;
}

enum Role {
  User = 'User',
  Admin = 'Admin',
}

interface MemberInterface {
  name: string;
  familyName: string;
  studentNumber: number;
  phoneNumber: string;
  email: string;
  verifiedPhoneNumber: boolean;
  dormitoryStudent: boolean;
  dormitory?: string;
  interests?: string[];
  cooperationAreas?: string[];
  role: Role;
}

interface ResponseData<T> {
  ok: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface SendTokenResponse {
  expiresAfter: Date;
}

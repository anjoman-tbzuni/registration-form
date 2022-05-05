interface CreateMember {
  studentNumber: number;
  phoneNumber: string;
  email: string;
  name: string;
  familyName: string;
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
  activityRecords?: string;
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

interface UpdateProfile {
  dormitoryStudent?: boolean;
  dormitory?: string;
  interests?: string[];
  cooperationAreas?: string[];
  activityRecords?: string;
  activityRecords?: string;
}

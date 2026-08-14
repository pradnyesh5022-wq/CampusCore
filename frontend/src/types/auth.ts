export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface MePayload {
  sub: string;
  user_id: number;
  role: UserRole;
}

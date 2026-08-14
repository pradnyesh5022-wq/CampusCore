import api from '@/lib/axios';
import type { LoginResponse, MePayload, User } from '@/types/auth';

export async function loginUser(email: string, password: string) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const { data } = await api.post<LoginResponse>('/users/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return data;
}

export async function getCurrentUserProfile(): Promise<User> {
  const { data } = await api.get<MePayload>('/users/me');

  return {
    id: data.user_id,
    username: data.sub,
    email: data.sub,
    role: data.role,
  };
}

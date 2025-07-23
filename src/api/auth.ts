import api from '@/lib/axios';

interface AdminLoginResponse {
  token: string;
  admin: {
    _id: string;
    name: string;
    email: string;
  };
}

export const loginAdmin = async (
  email: string,
  password: string
): Promise<AdminLoginResponse> => {
  const res = await api.post('/api/auth/admin/login', { email, password });
  return res.data;
};

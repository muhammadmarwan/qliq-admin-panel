import api from '@/lib/axios';

export interface MlmTreeResponse {
  _id: string;
  name: string;
  email: string;
  level: number;
  downlines: MlmTreeResponse[]; 
}

export const getMlmTree = async (): Promise<MlmTreeResponse> => {
  const res = await api.get('/api/users/mlm-tree');
  return res.data;
};
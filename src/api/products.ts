import api from '@/lib/axios';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getPaginatedProducts = async (
  page: number,
  limit: number
): Promise<{ data: Product[]; total: number }> => {
  const res = await api.get('/api/products', {
    params: { page, limit },
  });
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (
  data: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Product> => {
  const res = await api.post('/api/products', data);
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Omit<Product, '_id'>>
): Promise<Product> => {
  const res = await api.put(`/api/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/api/products/${id}`);
};

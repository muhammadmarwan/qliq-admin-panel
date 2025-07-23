import api from '@/lib/axios';

export interface OrderItem {
  product: {
    name: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  transactionId: string;
  paymentStatus: string;
}

export async function getPaginatedOrders(page: number, limit: number) {
  const res = await api.get(`/api/orders?page=${page}&limit=${limit}`);
  return res.data; // expects { data: Order[], total, page, limit, totalPages }
}

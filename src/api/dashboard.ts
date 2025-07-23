import api from '@/lib/axios';

export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalSales: number;
  totalCommission: number;
  recentOrders: {
    _id: string;
    total: number;
    paymentStatus: string;
    createdAt: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  }[];
  topUsersByOrders: {
    _id: string;
    orderCount: number;
    totalSpent: number;
  }[];
}

// Fetch admin dashboard stats
export const fetchAdminStats = async (): Promise<AdminStats> => {
  const res = await api.get('/api/admin/dashboard/stats');
  return res.data;
};

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminStats, fetchAdminStats } from '@/api/dashboard';

export default function DashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchAdminStats();
      setStats(data);
    };
    loadStats();
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} />
        <StatCard title="Total Commission" value={`$${stats.totalCommission.toFixed(2)}`} />
        <StatCard title="Top Buyer" value={stats.topUsersByOrders[0]?.orderCount + ' Orders'} />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-lg font-semibold mt-8 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {stats.recentOrders.slice(0, 5).map((order) => (
            <Card key={order._id}>
              <CardContent className="p-4 flex flex-col sm:flex-row justify-between">
                <div>
                  <p className="font-semibold">User: {order?.user?.name} ({order?.user?.email})</p>
                  <p className="text-sm text-muted-foreground">Order ID: {order._id}</p>
                </div>
                <div className="text-right sm:text-left mt-2 sm:mt-0">
                  <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
                  <p className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.paymentStatus}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

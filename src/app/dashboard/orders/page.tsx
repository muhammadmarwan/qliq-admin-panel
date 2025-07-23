'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPaginatedOrders, Order } from '@/api/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await getPaginatedOrders(page, limit);
        setOrders(res.data || []);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [page]);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        ) : orders.length === 0 ? (
        <div className="text-center text-muted-foreground">No orders found.</div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order._id}>
                <CardHeader>
                  <CardTitle>Order ID: {order._id}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p>
                      <strong>User:</strong> {order.user?.name ?? 'Unknown'} ({order.user?.email ?? 'No Email'})
                    </p>
                    <p>
                      <strong>Transaction ID:</strong> {order.transactionId ?? 'N/A'}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{' '}
                      <span
                        className={`ml-1 font-semibold ${
                          order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {order.paymentStatus?.toUpperCase() ?? 'UNKNOWN'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Total:</strong> ${order.total?.toFixed(2) ?? '0.00'}
                    </p>
                    <p>
                      <strong>Items:</strong> {order.items?.length ?? 0}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination className="mt-8 justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              <PaginationItem>
                <span className="px-4 text-sm">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}

"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CircleAlert, PackageCheck, ShoppingBag } from 'lucide-react';

type Order = {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'failed' | string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

function getStatusStyle(status: string) {
  if (status === 'paid') return 'bg-green-100 text-green-700 border-green-200';
  if (status === 'failed') return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-yellow-100 text-yellow-700 border-yellow-200';
}

function ProfileOrdersContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetch(`/api/orders?userId=${user.uid}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data || []);
          setFetching(false);
        })
        .catch(console.error);
    }
  }, [user, loading, router]);

  if (loading || fetching) return <div className="py-20 text-center">Loading orders...</div>;

  return (
    <div className="max-w-4xl">
      <Link href="/profile" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Account
      </Link>

      {searchParams.get('placed') === '1' && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 flex gap-3">
          <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-green-800">
            Your order has been placed successfully. Our team will contact you soon regarding delivery details.
          </p>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
          <p className="text-sm text-gray-500 mt-1">Track your recent purchases and payment status.</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
          Total orders: <span className="font-semibold text-gray-900">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center">
          <ShoppingBag className="mx-auto text-gray-300 mb-3" size={32} />
          <p className="text-gray-600 font-medium">You haven't placed any orders yet.</p>
          <p className="text-sm text-gray-500 mt-1">Explore products and checkout to see your orders here.</p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-mono text-sm text-gray-700">{order.id}</p>
                </div>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(order.status)}`}>
                  {order.status === 'failed' && <CircleAlert size={14} className="mr-1" />}
                  {order.status === 'paid' && <PackageCheck size={14} className="mr-1" />}
                  {order.status}
                </span>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                </div>
                <div className="rounded-lg bg-gray-50 px-3 py-2 border border-gray-100">
                  <p className="text-xs text-gray-500">Items</p>
                  <p className="font-medium text-gray-800">{order.items?.length || 0} product(s)</p>
                </div>
              </div>

              {order.items?.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 mb-2">Products</p>
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={`${order.id}-${index}`} className="text-sm text-gray-700 flex items-center justify-between gap-2">
                        <p className="truncate">{item.name}</p>
                        <p className="text-gray-500 shrink-0">x{item.quantity}</p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-xs text-gray-500">+{order.items.length - 3} more item(s)</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfileOrdersPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading orders...</div>}>
      <ProfileOrdersContent />
    </Suspense>
  );
}

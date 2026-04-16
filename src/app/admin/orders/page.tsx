"use client";
import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  PackageSearch,
  Search,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type AdminOrder = {
  id?: string;
  _id?: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  userId?: string;
  phone?: string;
  profile?: {
    fullName?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landmark?: string;
  };
};

function getOrderId(order: AdminOrder) {
  return order.id || order._id || 'N/A';
}

function getStatusBadge(status: string) {
  if (status === 'paid') return 'bg-green-100 text-green-700 border-green-200';
  if (status === 'failed') return 'bg-red-100 text-red-700 border-red-200';
  return 'bg-yellow-100 text-yellow-700 border-yellow-200';
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'failed'>('all');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return sortedOrders.filter((order) => {
      const matchesStatus = statusFilter === 'all' ? true : order.status === statusFilter;
      const matchesSearch =
        !searchValue ||
        getOrderId(order).toLowerCase().includes(searchValue) ||
        order.customerName?.toLowerCase().includes(searchValue) ||
        order.email?.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [sortedOrders, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleViewOrder = async (order: AdminOrder) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`/api/orders/${getOrderId(order)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch order details');
      setSelectedOrder(data);
    } catch {
      setSelectedOrder(order);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage and review all customer purchase orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order id, customer, email..."
              className="w-full h-10 rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'paid' | 'failed')}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4" colSpan={6}>
                      <div className="h-8 rounded bg-gray-100" />
                    </td>
                  </tr>
                ))
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center text-gray-500">
                      <PackageSearch className="mb-3 text-gray-300" size={36} />
                      <p className="font-medium">No orders found</p>
                      <p className="text-sm">Try changing search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={getOrderId(order)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {getOrderId(order).slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border capitalize ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="outline"
                        className="h-8 px-3 text-xs"
                        onClick={() => handleViewOrder(order)}
                      >
                        <ExternalLink size={13} className="mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-4 animate-pulse">
                <div className="h-16 bg-gray-100 rounded-lg" />
              </div>
            ))
          ) : paginatedOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <PackageSearch className="mx-auto mb-2 text-gray-300" size={30} />
              <p className="font-medium">No orders found</p>
            </div>
          ) : (
            paginatedOrders.map((order) => (
              <div key={getOrderId(order)} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-mono text-gray-500">{getOrderId(order).slice(0, 8)}...</p>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border capitalize ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                  <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Button
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  onClick={() => handleViewOrder(order)}
                >
                  <ExternalLink size={13} className="mr-1" />
                  View Details
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/30">
          <div className="text-xs font-medium text-gray-500">
            Showing <span className="text-gray-900">{paginatedOrders.length}</span> of{' '}
            <span className="text-gray-900">{filteredOrders.length}</span> orders
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 px-2.5 text-xs"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={14} className="mr-1" />
              Previous
            </Button>
            <div className="h-8 rounded-md border border-gray-200 bg-white px-3 flex items-center text-xs font-semibold">
              {page} / {totalPages}
            </div>
            <Button
              variant="outline"
              className="h-8 px-2.5 text-xs"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {detailsLoading && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl px-5 py-4 text-sm text-gray-700 border border-gray-100 shadow-xl">
            Loading order details...
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                <p className="text-xs text-gray-500 font-mono">{getOrderId(selectedOrder)}</p>
              </div>
              <button
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-medium text-gray-800">{selectedOrder.customerName}</p>
                  <p className="text-gray-500">{selectedOrder.email}</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="font-medium text-gray-800">
                    {selectedOrder.profile?.phone || selectedOrder.phone || 'N/A'}
                  </p>
                  <p className="text-gray-500 text-xs">User ID: {selectedOrder.userId || 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Amount / Status</p>
                  <p className="font-semibold text-gray-900">₹{selectedOrder.totalAmount}</p>
                  <span className={`mt-1 inline-flex px-2 py-0.5 text-xs rounded-full border capitalize ${getStatusBadge(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Razorpay Order ID</p>
                  <p className="font-mono text-xs text-gray-700 break-all">{selectedOrder.razorpayOrderId || 'N/A'}</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Razorpay Payment ID</p>
                  <p className="font-mono text-xs text-gray-700 break-all">{selectedOrder.razorpayPaymentId || 'N/A'}</p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm">
                <p className="text-xs text-gray-500 mb-2">Profile / Delivery Details</p>
                <p className="text-gray-800">{selectedOrder.profile?.addressLine1 || 'N/A'}</p>
                {selectedOrder.profile?.addressLine2 && (
                  <p className="text-gray-700">{selectedOrder.profile.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {(
                    [
                      selectedOrder.profile?.city,
                      selectedOrder.profile?.state,
                      selectedOrder.profile?.pincode,
                    ]
                      .filter(Boolean)
                      .join(', ') || 'N/A'
                  )}
                </p>
                <p className="text-gray-600 mt-1">
                  Landmark: {selectedOrder.profile?.landmark || 'N/A'}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Items</p>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="text-sm border border-gray-100 rounded-lg px-3 py-2 flex items-center justify-between">
                        <p className="text-gray-700">{item.name}</p>
                        <p className="text-gray-500 shrink-0 ml-3">x{item.quantity} • ₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No item details available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

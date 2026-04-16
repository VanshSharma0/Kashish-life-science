"use client";
import React, { useEffect, useState } from 'react';

export default function AdminOverview() {
  const [metrics, setMetrics] = useState({ products: 0, orders: 0, admins: 0 });
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json()),
      fetch('/api/admin/users').then(res => (res.ok ? res.json() : [])),
      fetch('/api/admin/auth/me').then(res => (res.ok ? res.json() : null)),
    ]).then(([prodData, ordData, adminData, meData]) => {
      setMetrics({
        products: prodData.length || 0,
        orders: ordData.length || 0,
        admins: adminData.length || 0,
      });
      if (meData?.admin?.name) setAdminName(meData.admin.name);
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
      <p className="text-sm text-gray-500 mb-6 sm:mb-8">Welcome back, {adminName}.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-gray-500 font-medium mb-2">Total Products</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">{metrics.products}</span>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-gray-500 font-medium mb-2">Total Orders</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">{metrics.orders}</span>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-gray-500 font-medium mb-2">Admin Accounts</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">{metrics.admins}</span>
        </div>
      </div>
    </div>
  );
}

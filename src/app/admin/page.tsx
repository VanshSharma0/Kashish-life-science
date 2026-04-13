"use client";
import React, { useEffect, useState } from 'react';

export default function AdminOverview() {
  const [metrics, setMetrics] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/orders').then(res => res.json())
    ]).then(([prodData, ordData]) => {
      setMetrics({ products: prodData.length || 0, orders: ordData.length || 0 });
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-gray-500 font-medium mb-2">Total Products</span>
          <span className="text-4xl font-extrabold text-blue-600">{metrics.products}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <span className="text-gray-500 font-medium mb-2">Total Orders</span>
          <span className="text-4xl font-extrabold text-blue-600">{metrics.orders}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-50 min-h-screen fixed inset-0 z-[100] w-full">
      <style>{`header, footer { display: none !important; } body { padding-top: 0 !important; }`}</style>
      
      {/* Sidebar */}
      <div className="w-64 bg-emerald-950 text-white min-h-screen p-4 flex flex-col fixed inset-y-0 left-0">
        <div className="mb-8 p-2">
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-tight text-white cursor-pointer hover:opacity-80">Kashish<span className="text-green-500">Admin</span></h2>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-900 transition-colors">
            <LayoutDashboard size={20} />
            Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-900 transition-colors">
            <Package size={20} />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-900 transition-colors">
            <ShoppingCart size={20} />
            Orders
          </Link>
        </nav>
        
        <div className="mt-auto border-t border-emerald-800 pt-4">
          <button 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors w-full text-left"
            onClick={() => {
              document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/admin/login";
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

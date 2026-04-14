"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];

  const isActive = (href: string) => pathname === href;

  const handleSignOut = () => {
    document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/admin/login";
  };

  return (
    <div className="bg-gray-50 min-h-screen fixed inset-0 z-100 w-full overflow-hidden">
      <style>{`header, footer { display: none !important; } body { padding-top: 0 !important; }`}</style>

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 h-16 bg-blue-950 text-white flex items-center justify-between px-4 border-b border-blue-900">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-blue-900 transition-colors"
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>
        <p className="text-sm font-semibold tracking-wide">
          Kashish Life Science® <span className="text-blue-400">Admin</span>
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="p-2 rounded-md hover:bg-red-500/20 text-red-300 transition-colors"
          aria-label="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-blue-950 text-white min-h-screen p-4 flex-col fixed inset-y-0 left-0">
        <div className="mb-8 p-2">
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-tight text-white cursor-pointer hover:opacity-80">
              Kashish Life Science® <span className="text-blue-400">Admin</span>
            </h2>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(href) ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 text-blue-100'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-blue-800 pt-4">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors w-full text-left"
            onClick={handleSignOut}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-blue-950 text-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg font-bold">
                Kashish Life Science® <span className="text-blue-400">Admin</span>
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-blue-900"
                aria-label="Close admin menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(href) ? 'bg-blue-900 text-white' : 'hover:bg-blue-900 text-blue-100'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-blue-800 pt-4">
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors w-full text-left"
                onClick={handleSignOut}
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="h-full overflow-y-auto lg:ml-64 p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

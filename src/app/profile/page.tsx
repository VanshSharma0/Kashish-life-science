"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="py-20 text-center">Loading account details...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-wrap gap-4">
          <Link href="/profile/orders">
            <Button variant="outline">View Order History</Button>
          </Link>
          <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => {
            signOut();
            router.push('/');
          }}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

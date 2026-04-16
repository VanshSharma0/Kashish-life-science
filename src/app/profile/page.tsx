"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  CustomerProfile,
  loadCustomerProfile,
  saveCustomerProfile,
  validateCustomerProfile,
} from '@/lib/customerProfile';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<CustomerProfile>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const existing = loadCustomerProfile(user.uid);
    if (existing) {
      setProfile(existing);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      fullName: user.displayName || '',
      phone: prev.phone || '',
    }));
  }, [user]);

  if (loading || !user) return <div className="py-20 text-center">Loading account details...</div>;

  const missingFields = validateCustomerProfile(profile);

  const handleSaveProfile = () => {
    saveCustomerProfile(user.uid, profile);
    setSaveMessage('Profile saved. You can now checkout from cart.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Delivery Profile</h3>
              <p className="text-sm text-gray-500">Complete these details before payment checkout.</p>
            </div>
            {missingFields.length === 0 ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Complete</span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Incomplete</span>
            )}
          </div>

          {missingFields.length > 0 && (
            <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 mb-4">
              Missing: {missingFields.join(', ')}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <input
              className="sm:col-span-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Address Line 1"
              value={profile.addressLine1}
              onChange={(e) => setProfile((prev) => ({ ...prev, addressLine1: e.target.value }))}
            />
            <input
              className="sm:col-span-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Address Line 2 (optional)"
              value={profile.addressLine2}
              onChange={(e) => setProfile((prev) => ({ ...prev, addressLine2: e.target.value }))}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="City"
              value={profile.city}
              onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="State"
              value={profile.state}
              onChange={(e) => setProfile((prev) => ({ ...prev, state: e.target.value }))}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Pincode"
              value={profile.pincode}
              onChange={(e) => setProfile((prev) => ({ ...prev, pincode: e.target.value }))}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              placeholder="Landmark (optional)"
              value={profile.landmark}
              onChange={(e) => setProfile((prev) => ({ ...prev, landmark: e.target.value }))}
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button onClick={handleSaveProfile}>Save Profile</Button>
            {saveMessage && <p className="text-sm text-green-700">{saveMessage}</p>}
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

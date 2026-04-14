"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password === 'admin123') {
      const secureFlag = window.location.protocol === 'https:' ? '; secure' : '';
      document.cookie = `admin_session=authenticated; path=/; max-age=86400; samesite=lax${secureFlag}`;
      window.location.assign('/admin');
    } else {
      setError('Invalid admin password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 fixed inset-0 z-100">
      <style>{`header, footer { display: none !important; }`}</style>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Portal</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passkey</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter password (admin123)"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Secure Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}

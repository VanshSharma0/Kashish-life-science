"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, ShieldCheck, User } from 'lucide-react';

type AdminItem = {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const fetchAdmins = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/users');
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load admins');
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create admin');
      setIsModalOpen(false);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      fetchAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this admin user?')) return;
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      fetchAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage dashboard access and admin roles.</p>
        </div>
        <Button onClick={() => { setError(''); setIsModalOpen(true); }}>
          <Plus size={16} className="mr-2" /> Add Admin
        </Button>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No admin users found.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {admins.map((admin) => (
              <div key={admin.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{admin.name}</p>
                  <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${admin.role === 'super_admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
                      {admin.role === 'super_admin' ? <ShieldCheck size={12} className="mr-1" /> : <User size={12} className="mr-1" />}
                      {admin.role}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${admin.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                      {admin.isActive ? 'active' : 'inactive'}
                    </span>
                  </div>
                </div>

                <button
                  className="text-red-600 hover:text-red-800 inline-flex items-center text-sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  <Trash2 size={15} className="mr-1" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-70 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl border border-gray-100 shadow-xl p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create Admin</h2>
            {error && <p className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{error}</p>}
            <form onSubmit={handleCreate} className="space-y-3" autoComplete="off">
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Name"
                name="create_admin_name"
                autoComplete="off"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Email"
                type="email"
                name="create_admin_email"
                autoComplete="off"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Password (min 8 chars)"
                type="password"
                minLength={8}
                name="create_admin_password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                value={form.role}
                onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => { setError(''); setIsModalOpen(false); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating ? 'Creating...' : 'Create Admin'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

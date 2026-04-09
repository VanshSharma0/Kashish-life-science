"use client";

import React, { useState, useEffect } from 'react';
import { ProductType } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2, Plus, UploadCloud } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, type: 'Powder', imageUrl: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.map((p:any) => ({...p, id: p._id})));
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product?: ProductType) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name, description: product.description,
        price: product.price, type: product.type, imageUrl: product.imageUrl
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', price: 0, type: 'Powder', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(uploading) return;
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const method = editingId ? 'PUT' : 'POST';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error(error);
        setUploading(false);
        alert('Image upload failed');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData({ ...formData, imageUrl: downloadURL });
        setUploading(false);
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                    <div className="relative h-10 w-10 border rounded overflow-hidden bg-gray-100 shrink-0">
                       <img 
                          src={product.imageUrl || '/logo.jpeg'} 
                          alt={product.name} 
                          className="object-cover w-full h-full"
                          onError={(e) => { e.currentTarget.src = '/logo.jpeg'; }}
                       />
                    </div>
                    <span className="font-medium text-gray-900 max-w-xs truncate">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-900 mx-2"><Pencil size={18}/></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 mx-2"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="p-8 text-center text-gray-500">No products found.</div>}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as 'Powder'|'Liquid'})} className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-500">
                    <option>Powder</option>
                    <option>Liquid</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Asset</label>
                <div className="flex gap-2 items-center">
                  <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 text-sm" placeholder="URL or tap upload ->" />
                  
                  <div className="relative flex shrink-0 items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-2 cursor-pointer transition-colors w-10 overflow-hidden">
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" disabled={uploading} />
                    {uploading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full" />
                    ) : (
                      <UploadCloud size={20} className="text-gray-600" />
                    )}
                  </div>
                </div>
                {uploading && <p className="text-xs text-green-600 mt-1">Uploading to secure Firebase storage...</p>}
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? 'Saving...' : 'Save Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

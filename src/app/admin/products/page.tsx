"use client";

import React, { useState, useEffect } from 'react';
import { ProductType } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2, Plus, UploadCloud } from 'lucide-react';
import { stripPackSuffixFromName } from '@/lib/productCatalog';

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
  quantity: string;
  dosage: string;
  benefits: string;
};

function buildVariantFamilyKey(name: string) {
  const base = stripPackSuffixFromName(name || '')
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!base) return '';

  const tokens = base
    .split(/[\s-]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => t !== 'plus');

  return [...new Set(tokens)].sort().join('-');
}

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [autofillSource, setAutofillSource] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '', description: '', price: 0, type: 'Powder', imageUrl: '',
    quantity: '', dosage: '', benefits: ''
  });

  const getTemplateForName = (name: string): ProductType | null => {
    const key = stripPackSuffixFromName(name).toLowerCase();
    const familyKey = buildVariantFamilyKey(name);
    if (!key) return null;
    const match = products.find((p) => {
      const byName = stripPackSuffixFromName(p.name).toLowerCase() === key;
      const byCatalog = (p.catalogTitle?.trim().toLowerCase() || '') === key;
      const byFamily =
        buildVariantFamilyKey(p.name) === familyKey ||
        buildVariantFamilyKey(p.catalogTitle || '') === familyKey;
      return byName || byCatalog || byFamily;
    });
    return match ?? null;
  };

  const applyTemplate = (
    draft: ProductFormData,
    template: ProductType
  ): ProductFormData => {
    return {
      ...draft,
      description: draft.description || template.description || '',
      dosage: draft.dosage || template.dosage || '',
      imageUrl: draft.imageUrl || template.imageUrl || '',
      benefits: draft.benefits || template.benefits?.join('\n') || '',
      type: draft.type === 'Powder' ? template.type || draft.type : draft.type,
    };
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
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
      setAutofillSource(null);
      setFormData({
        name: product.name, description: product.description,
        price: product.price, type: product.type, imageUrl: product.imageUrl,
        quantity: product.quantity || '', dosage: product.dosage || '',
        benefits: product.benefits?.join('\n') || ''
      });
    } else {
      setEditingId(null);
      setAutofillSource(null);
      setFormData({ name: '', description: '', price: 0, type: 'Powder', imageUrl: '', quantity: '', dosage: '', benefits: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(uploading) return;
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    const method = editingId ? 'PUT' : 'POST';
    const payload = {
      ...formData,
      benefits: formData.benefits.split('\n').map(s => s.trim()).filter(Boolean)
    };
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("Image is too large! Please select an image smaller than 10MB.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setFormData({ ...formData, imageUrl: base64String });
      setUploading(false);
    };

    reader.onerror = (error) => {
      console.error("Image processing error:", error);
      setUploading(false);
      alert("Could not process image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const groupingBaseName = stripPackSuffixFromName(formData.name || '');
  const groupingFamilyKey = buildVariantFamilyKey(formData.name || '');
  const groupingPreviewId = groupingBaseName
    ? `auto-${groupingFamilyKey || groupingBaseName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
    : '';

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Products</h1>
        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
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
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {products.map((product) => (
              <div key={product.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 border rounded overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={product.imageUrl || '/logo.jpeg'}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      onError={(e) => { e.currentTarget.src = '/logo.jpeg'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">₹{product.price}</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-900"><Pencil size={18}/></button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && <div className="p-8 text-center text-gray-500">No products found.</div>}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-5 w-full max-w-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={e => {
                    const nextName = e.target.value;
                    if (editingId) {
                      setFormData({ ...formData, name: nextName });
                      return;
                    }
                    const template = getTemplateForName(nextName);
                    let nextData = { ...formData, name: nextName };
                    if (template) {
                      nextData = applyTemplate(nextData, template);
                      setAutofillSource(stripPackSuffixFromName(template.name));
                    } else {
                      setAutofillSource(null);
                    }
                    setFormData(nextData);
                  }}
                  className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm"
                />
                {autofillSource && !editingId && (
                  <p className="mt-1 text-xs text-indigo-700">
                    Will be added as a variant of: {autofillSource} (shared fields auto-filled)
                  </p>
                )}
                {!editingId && groupingBaseName && (
                  <p className="mt-1 text-xs text-blue-600">
                    Grouping preview: <span className="font-medium">{groupingBaseName}</span>{' '}
                    <span className="text-blue-500">({groupingPreviewId})</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" rows={2} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Price (₹)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as 'Powder'|'Liquid'})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm">
                    <option>Powder</option>
                    <option>Liquid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Quantity / Presentation</label>
                  <input value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" placeholder="e.g. 1 Ltr" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Dosage</label>
                  <input value={formData.dosage} onChange={e => setFormData({...formData, dosage: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" placeholder="e.g. 100 ml daily" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Uses / Indications / Benefits (One per line)</label>
                <textarea value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" rows={2} placeholder="Helps prevent mastitis&#10;Improves feed digestion" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Image Asset</label>
                <div className="flex gap-2 items-center">
                  <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="flex-1 border border-gray-300 rounded-md p-1.5 outline-none focus:border-blue-500 text-sm" placeholder="URL or tap upload ->" />
                  
                  <div className="relative flex shrink-0 items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md p-2 cursor-pointer transition-colors w-10 overflow-hidden">
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" disabled={uploading} />
                    {uploading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full" />
                    ) : (
                      <UploadCloud size={20} className="text-gray-600" />
                    )}
                  </div>
                </div>
                {uploading && <p className="text-xs text-blue-600 mt-1">Processing image locally...</p>}
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" disabled={uploading}>
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

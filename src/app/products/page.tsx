"use client";

import React, { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductType } from '@/lib/data';

export default function ProductsPage() {
  const [filter, setFilter] = useState<'All' | 'Powder' | 'Liquid'>('All');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Map _id to id so components don't break
        const formatted = data.map((p: any) => ({ ...p, id: p._id }));
        setProducts(formatted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.type === filter);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Products</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Browse our complete catalog of premium cattle feed supplements and therapeutic medicines.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['All', 'Powder', 'Liquid'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                filter === type 
                  ? 'bg-green-600 border-green-600 text-white shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 cursor-pointer'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading products from database...</div>
      ) : (
        <React.Fragment>
          <ProductGrid products={filteredProducts} />
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found for this category.
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

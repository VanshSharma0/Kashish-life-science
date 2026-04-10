"use client";

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { ProductType } from '@/lib/data';

export default function ProductDetails(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === params.id);
        if (found) {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-24 text-gray-500">Loading details...</div>;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
          <Image 
            src={product.imageUrl} 
            alt={product.name}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-widest uppercase w-max">
              {product.type}
            </span>
            {product.quantity && (
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase w-max">
                {product.quantity}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-green-600 mb-6">₹{product.price}</p>
          
          <div className="prose prose-emerald text-gray-600 mb-8">
            <p className="text-lg">{product.description}</p>
          </div>

          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-500" />
                Key Benefits & Indications
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.dosage && (
            <div className="mb-10 p-5 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="text-sm font-bold text-green-900 mb-2 uppercase tracking-wide">Recommended Dosage</h3>
              <p className="text-green-800 font-medium whitespace-pre-wrap">{product.dosage}</p>
            </div>
          )}

          {product.composition && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Full Composition</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {product.composition}
              </p>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-gray-100">
            <Button size="lg" className="w-full sm:w-auto px-12" onClick={() => addItem(product)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

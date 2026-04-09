"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/lib/data';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/cartStore';

export const ProductCard = ({ product }: { product: ProductType }) => {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-green-100 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {product.type}
          </span>
          <span className="font-bold text-lg text-gray-900">₹{product.price}</span>
        </div>
        <Link href={`/products/${product.id}`} className="mb-2 block">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

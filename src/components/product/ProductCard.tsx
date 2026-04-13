"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useCartStore } from "@/store/cartStore";
import type { CatalogGroup } from "@/lib/productCatalog";
import {
  formatPriceRange,
  formatTypeLabel,
  formatVariantQuantities,
} from "@/lib/productCatalog";
import {
  buildCartProductLabel,
  formatProductDisplayName,
} from "@/lib/productDisplayName";

export const ProductCard = ({ group }: { group: CatalogGroup }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearTimeout(cooldownRef.current);
    };
  }, []);

  const title = formatProductDisplayName(group.catalogTitle);
  const qtyLine = formatVariantQuantities(group.variants);
  const typeLabel = formatTypeLabel(group.variants);
  const defaultVariant = group.variants[0];
  const multi = group.variants.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (multi || justAdded) return;
    addItem({
      id: defaultVariant.id,
      name: buildCartProductLabel(defaultVariant),
      price: defaultVariant.price,
      imageUrl: defaultVariant.imageUrl,
      type: defaultVariant.type,
    });
    setJustAdded(true);
    if (cooldownRef.current) clearTimeout(cooldownRef.current);
    cooldownRef.current = setTimeout(() => {
      setJustAdded(false);
      cooldownRef.current = null;
    }, 1600);
  };

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-100 flex flex-col h-full">
      <Link
        href={`/products/${group.canonicalId}`}
        className="block relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4"
      >
        <Image
          src={defaultVariant.imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {typeLabel}
          </span>
          <span className="font-bold text-lg text-gray-900">
            {formatPriceRange(group.minPrice, group.maxPrice)}
          </span>
        </div>
        <Link
          href={`/products/${group.canonicalId}`}
          className="mb-1 block"
        >
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        {qtyLine && (
          <p className="text-xs text-blue-700 font-medium mb-2">{qtyLine}</p>
        )}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {group.description}
        </p>
        {multi ? (
          <Link
            href={`/products/${group.canonicalId}`}
            className="w-full inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 px-4 py-2 text-base"
          >
            Choose pack size
          </Link>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full transition-colors"
            disabled={justAdded}
          >
            {justAdded ? "Added!" : "Add to Cart"}
          </Button>
        )}
      </div>
    </div>
  );
};

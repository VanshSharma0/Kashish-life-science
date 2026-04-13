"use client";

import React, { use, useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import type { ProductType } from "@/lib/data";
import {
  buildCartProductLabel,
  formatProductDisplayName,
} from "@/lib/productDisplayName";
import {
  formatTypeLabel,
  formatVariantQuantities,
} from "@/lib/productCatalog";

type ProductPayload = {
  product: ProductType;
  variants: ProductType[];
};

export default function ProductDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = use(props.params);
  const addItem = useCartStore((state) => state.addItem);
  const [payload, setPayload] = useState<ProductPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryTick, setRetryTick] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const addCooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setJustAdded(false);
  }, [selectedId]);

  useEffect(() => {
    return () => {
      if (addCooldownRef.current) clearTimeout(addCooldownRef.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadError(null);
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const body = (await res.json().catch(() => null)) as
          | ProductPayload
          | { error?: string }
          | null;

        if (cancelled) return;

        if (res.status === 404) {
          setPayload(null);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          const msg =
            (body && "error" in body && body.error) ||
            `Could not load product (${res.status})`;
          setLoadError(typeof msg === "string" ? msg : "Could not load product");
          setPayload(null);
          setLoading(false);
          return;
        }

        if (
          !body ||
          !("product" in body) ||
          !("variants" in body) ||
          !Array.isArray((body as ProductPayload).variants) ||
          !(body as ProductPayload).variants.length
        ) {
          setLoadError("Invalid response from server");
          setPayload(null);
          setLoading(false);
          return;
        }

        const data = body as ProductPayload;
        setPayload(data);
        const match =
          data.variants.find((v) => v.id === params.id) ?? data.variants[0];
        setSelectedId(match.id);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setLoadError("Network error — check your connection and try again.");
          setPayload(null);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.id, retryTick]);

  const selected = useMemo(() => {
    if (!payload?.variants.length) return null;
    return (
      payload.variants.find((v) => v.id === selectedId) ??
      payload.variants[0]
    );
  }, [payload, selectedId]);

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500">Loading details...</div>
    );
  }

  if (!payload && !loadError) {
    notFound();
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-gray-700 mb-4">{loadError}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            onClick={() => setRetryTick((t) => t + 1)}
          >
            Try again
          </Button>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 text-base"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  if (!payload || !selected) {
    notFound();
  }

  const { variants } = payload;
  const catalogTitle =
    selected.catalogTitle?.trim() ||
    variants[0].catalogTitle?.trim() ||
    selected.name;
  const displayTitle = formatProductDisplayName(catalogTitle);
  const multi = variants.length > 1;
  const qtySummary = formatVariantQuantities(variants);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
          <Image
            src={selected.imageUrl}
            alt={formatProductDisplayName(selected.name)}
            fill
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase w-max">
              {formatTypeLabel(variants)}
            </span>
            {qtySummary && (
              <span
                className="inline-block px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold w-max"
                title="Available pack sizes"
              >
                Sizes: {qtySummary}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            {displayTitle}
          </h1>
          {multi && selected.quantity?.trim() ? (
            <p className="text-sm font-medium text-gray-600 mb-4">
              Pack: {selected.quantity.trim()}
            </p>
          ) : null}

          {multi ? (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Select pack size
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const active = v.id === selected.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedId(v.id)}
                      className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                      }`}
                    >
                      <span className="block">
                        {v.quantity || "Standard"}
                      </span>
                      <span className="text-xs text-gray-600">₹{v.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <p className="text-3xl font-bold text-blue-600 mb-6">₹{selected.price}</p>

          <div className="prose prose-slate text-gray-600 mb-8">
            <p className="text-lg">{selected.description}</p>
          </div>

          {selected.benefits && selected.benefits.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" />
                Key Benefits & Indications
              </h3>
              <ul className="space-y-3">
                {selected.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <Check
                      size={20}
                      className="text-blue-500 shrink-0 mt-0.5"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selected.dosage && (
            <div className="mb-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">
                Recommended Dosage
              </h3>
              <p className="text-blue-800 font-medium whitespace-pre-wrap">
                {selected.dosage}
              </p>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-gray-100">
            <Button
              size="lg"
              className="w-full sm:w-auto px-12 transition-colors"
              disabled={justAdded}
              onClick={() => {
                if (justAdded) return;
                addItem({
                  id: selected.id,
                  name: buildCartProductLabel(selected),
                  price: selected.price,
                  imageUrl: selected.imageUrl,
                  type: selected.type,
                });
                setJustAdded(true);
                if (addCooldownRef.current) clearTimeout(addCooldownRef.current);
                addCooldownRef.current = setTimeout(() => {
                  setJustAdded(false);
                  addCooldownRef.current = null;
                }, 1600);
              }}
            >
              {justAdded ? "Added!" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

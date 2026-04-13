"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-blue-50 p-5 text-blue-600">
        <SearchX size={42} />
      </div>
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900">
        Product Not Found
      </h1>
      <p className="mb-8 max-w-xl text-base text-gray-600 sm:text-lg">
        That product link is invalid or no longer available. Browse our catalog
        to discover all available products.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          View All Products
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

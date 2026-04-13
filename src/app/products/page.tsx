"use client";

import React, { useState, useEffect } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { CatalogGroup } from "@/lib/productCatalog";

export default function ProductsPage() {
  const [filter, setFilter] = useState<"All" | "Powder" | "Liquid">("All");
  const [groups, setGroups] = useState<CatalogGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/catalog")
      .then((res) => res.json())
      .then((data: { groups?: CatalogGroup[]; error?: string }) => {
        if (!data.groups || !Array.isArray(data.groups)) {
          setGroups([]);
          setLoading(false);
          return;
        }
        setGroups(data.groups);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredGroups =
    filter === "All"
      ? groups
      : groups.filter((g) =>
          g.variants.some((v) => v.type === filter)
        );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Products
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Browse our complete catalog of premium cattle feed supplements and
            therapeutic medicines.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Powder", "Liquid"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type as "All" | "Powder" | "Liquid")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                filter === type
                  ? "bg-blue-600 border-blue-600 text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 cursor-pointer"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading products...
        </div>
      ) : (
        <React.Fragment>
          <ProductGrid groups={filteredGroups} />

          {filteredGroups.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found for this category.
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

import React from "react";
import type { CatalogGroup } from "@/lib/productCatalog";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ groups }: { groups: CatalogGroup[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {groups.map((group) => (
        <ProductCard key={group.canonicalId} group={group} />
      ))}
    </div>
  );
};

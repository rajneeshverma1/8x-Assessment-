"use client";

import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { PackageX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <PackageX className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100">No products found</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-md">
          We couldn't find any products matching your search or filters. Try clearing your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

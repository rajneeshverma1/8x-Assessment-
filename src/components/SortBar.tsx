"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { SortOption } from "@/types";
import { ArrowUpDown } from "lucide-react";

interface SortBarProps {
  totalResults: number;
}

export const SortBar: React.FC<SortBarProps> = ({ totalResults }) => {
  const { sortOption, setSortOption, filterState } = useCart();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      
      {/* Results summary */}
      <div className="text-xs text-gray-600 dark:text-zinc-400">
        Showing <span className="font-bold text-gray-900 dark:text-zinc-100">{totalResults}</span> results
        {filterState.searchQuery && (
          <span>
            {" "}
            for <strong className="text-amber-600">"{filterState.searchQuery}"</strong>
          </span>
        )}
        {filterState.category !== "All Categories" && (
          <span>
            {" "}
            in <strong className="text-gray-900 dark:text-zinc-200">{filterState.category}</strong>
          </span>
        )}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-zinc-300">
          <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
          <span>Sort by:</span>
        </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs text-gray-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        >
          <option value="featured">Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="avg-customer-review">Avg. Customer Review</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

    </div>
  );
};

"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockProducts";
import { Star, Check, RotateCcw, SlidersHorizontal } from "lucide-react";

export const FilterSidebar: React.FC = () => {
  const { filterState, setFilterState } = useCart();

  const resetAllFilters = () => {
    setFilterState({
      category: "All Categories",
      searchQuery: "",
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      isPrimeOnly: false,
      isDealOnly: false,
    });
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 rounded-lg border border-gray-200 bg-white p-4 text-xs text-gray-800 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      
      <div className="flex items-center justify-between border-b pb-3 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-zinc-100">
          <SlidersHorizontal className="h-4 w-4 text-amber-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetAllFilters}
          className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline dark:text-blue-400"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-2">Department</h4>
        <ul className="space-y-1.5 pl-1">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, category: cat }))}
                className={`w-full text-left transition ${
                  filterState.category === cat
                    ? "font-bold text-amber-600 dark:text-amber-400"
                    : "text-gray-600 hover:text-amber-600 dark:text-zinc-400"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Prime Eligibility */}
      <div className="border-t pt-4 dark:border-zinc-800">
        <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-2">Amazon Prime</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterState.isPrimeOnly}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, isPrimeOnly: e.target.checked }))
            }
            className="rounded border-gray-300 text-amber-500 focus:ring-amber-400"
          />
          <div className="flex items-center font-bold text-sky-600 text-xs">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
            <span className="italic font-extrabold">prime</span>
          </div>
        </label>
      </div>

      {/* Customer Review Rating */}
      <div className="border-t pt-4 dark:border-zinc-800">
        <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-2">Customer Reviews</h4>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setFilterState((prev) => ({
                  ...prev,
                  minRating: prev.minRating === rating ? 0 : rating,
                }))
              }
              className={`flex items-center gap-1 w-full text-left p-1 rounded transition hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                filterState.minRating === rating ? "bg-amber-50 font-bold" : ""
              }`}
            >
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${star <= rating ? "fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-zinc-400">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="border-t pt-4 dark:border-zinc-800">
        <h4 className="font-bold text-gray-900 dark:text-zinc-100 mb-2">Max Price (${filterState.maxPrice})</h4>
        <input
          type="range"
          min={0}
          max={2000}
          step={25}
          value={filterState.maxPrice}
          onChange={(e) =>
            setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>

    </aside>
  );
};

"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockProducts";
import { Menu, Zap, ShieldCheck, Gift, X } from "lucide-react";

export const CategoryNav: React.FC = () => {
  const { filterState, setFilterState } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const selectCategory = (category: string) => {
    setFilterState((prev) => ({
      ...prev,
      category,
      searchQuery: "",
    }));
    setIsOpen(false);
  };

  const toggleDeals = () => {
    setFilterState((prev) => ({
      ...prev,
      isDealOnly: !prev.isDealOnly,
    }));
  };

  return (
    <>
      <nav className="flex items-center gap-4 bg-[#232f3e] px-4 py-1.5 text-xs font-medium text-white shadow-inner overflow-x-auto whitespace-nowrap scrollbar-none">
        
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 rounded border border-transparent px-2 py-1 transition hover:border-white focus:outline-none font-bold"
        >
          <Menu className="h-4 w-4" />
          <span>All</span>
        </button>

        <button
          onClick={toggleDeals}
          className={`flex items-center gap-1 rounded border border-transparent px-2 py-1 transition hover:border-white ${
            filterState.isDealOnly ? "bg-amber-500 text-gray-900 font-bold" : ""
          }`}
        >
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Today's Deals</span>
        </button>

        {CATEGORIES.filter((c) => c !== "All Categories").map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`rounded border border-transparent px-2 py-1 transition hover:border-white ${
              filterState.category === cat ? "border-white bg-white/10 font-bold" : ""
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="hidden lg:flex items-center gap-1 rounded border border-transparent px-2 py-1 transition hover:border-white cursor-pointer">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
          <span>Prime Perks</span>
        </div>

        <div className="hidden xl:flex items-center gap-1 rounded border border-transparent px-2 py-1 transition hover:border-white cursor-pointer">
          <Gift className="h-3.5 w-3.5 text-pink-400" />
          <span>Gift Cards</span>
        </div>

      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs transition-opacity">
          <div className="w-80 max-w-[80vw] bg-white text-gray-900 shadow-2xl overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between bg-[#232f3e] p-4 text-white font-bold text-lg">
              <div className="flex items-center gap-2">
                <Menu className="h-6 w-6" />
                <span>Browse Categories</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded p-1 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm flex-1">
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => selectCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md hover:bg-amber-50 font-medium ${
                        filterState.category === cat ? "bg-amber-100 text-amber-900 font-bold" : "text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockProducts";
import { Menu, X, ChevronRight, User, ShoppingBag, Gift, Sparkles, HelpCircle, PhoneCall } from "lucide-react";

export const CategoryNav: React.FC = () => {
  const { filterState, setFilterState, setIsOrdersOpen, setIsWishlistOpen, setIsAuthModalOpen, user } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeCategory = filterState.category || "All Categories";

  const handleCategorySelect = (cat: string) => {
    setFilterState((prev) => ({
      ...prev,
      category: cat,
      searchQuery: "",
    }));
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="bg-[#232f3e] text-white text-xs font-medium border-b border-[#37475a]">
        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          
          {/* All Hamburger Drawer Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1 rounded border border-transparent px-2 py-1 font-bold transition hover:border-white focus:outline-none bg-white/10 hover:bg-white/20"
          >
            <Menu className="h-4 w-4" />
            <span>All</span>
          </button>

          {/* Shortcut Links */}
          <button
            onClick={() => setFilterState((prev) => ({ ...prev, isDealOnly: !prev.isDealOnly }))}
            className={`rounded border border-transparent px-2 py-1 font-bold transition hover:border-white ${
              filterState.isDealOnly ? "bg-amber-500 text-gray-900" : ""
            }`}
          >
            Today's Deals
          </button>

          {CATEGORIES.filter((c) => c !== "All Categories").map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`rounded border border-transparent px-2.5 py-1 transition hover:border-white ${
                  isSelected ? "bg-[#37475a] font-bold text-white border-gray-400" : "text-gray-200"
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            onClick={() => setIsOrdersOpen(true)}
            className="hidden lg:inline-block rounded border border-transparent px-2.5 py-1 text-gray-200 transition hover:border-white"
          >
            Customer Service
          </button>
          
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="hidden xl:inline-block rounded border border-transparent px-2.5 py-1 text-gray-200 transition hover:border-white"
          >
            Registry & Gift Cards
          </button>
        </div>
      </nav>

      {/* Slide-over Left Drawer ("All" Menu) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between bg-[#232f3e] px-6 py-4 text-white">
              <div
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsDrawerOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer hover:opacity-90"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-300">Hello,</div>
                  <div className="text-base font-extrabold">{user?.name ? user.name : "Sign in"}</div>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-md p-1.5 text-gray-300 hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 text-xs text-gray-700 dark:text-zinc-300">
              
              {/* Shop by Department */}
              <div>
                <h4 className="font-extrabold text-sm uppercase text-gray-900 dark:text-zinc-100 tracking-wider mb-3">
                  Shop By Department
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                    >
                      <span>{cat}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-zinc-800" />

              {/* Digital Content & Devices */}
              <div>
                <h4 className="font-extrabold text-sm uppercase text-gray-900 dark:text-zinc-100 tracking-wider mb-3">
                  Programs & Features
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setFilterState((prev) => ({ ...prev, isDealOnly: true }));
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-amber-500" />
                      <span>Today's Deals & Sales</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => {
                      setFilterState((prev) => ({ ...prev, isPrimeOnly: true }));
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      <span>Amazon Prime Perks</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-emerald-500" />
                      <span>Saved Wishlist Items</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-zinc-800" />

              {/* Help & Settings */}
              <div>
                <h4 className="font-extrabold text-sm uppercase text-gray-900 dark:text-zinc-100 tracking-wider mb-3">
                  Help & Settings
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <span>Your Account</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOrdersOpen(true);
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <span>Your Orders</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOrdersOpen(true);
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-left font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span>Customer Service</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

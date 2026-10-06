"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockProducts";
import { Search, ShoppingCart, MapPin, Heart, ChevronDown, Globe } from "lucide-react";

export const Header: React.FC = () => {
  const { cart, wishlist, setIsCartOpen, filterState, setFilterState } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(filterState.category || "All Categories");
  const [searchInput, setSearchInput] = useState(filterState.searchQuery || "");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState((prev) => ({
      ...prev,
      category: selectedCategory,
      searchQuery: searchInput,
    }));
  };

  const handleLogoClick = () => {
    setFilterState({
      category: "All Categories",
      searchQuery: "",
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      isPrimeOnly: false,
      isDealOnly: false,
    });
    setSearchInput("");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#131921] text-white shadow-md">
      <div className="flex items-center justify-between gap-2 px-3 py-2 md:gap-4 md:px-4">
        
        {/* Amazon Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white focus:outline-none"
        >
          <span className="font-bold text-2xl tracking-tighter text-white">
            amazon<span className="text-[#febd69] font-medium text-lg">.clone</span>
          </span>
        </button>

        {/* Deliver To Selector */}
        <button
          onClick={() => alert("Deliver to: New York 10001")}
          className="hidden lg:flex items-center gap-1 rounded border border-transparent p-1.5 text-left transition hover:border-white focus:outline-none"
        >
          <MapPin className="h-5 w-5 text-gray-300" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-gray-400">Deliver to</span>
            <span className="font-bold text-white text-sm">New York 10001</span>
          </div>
        </button>

        {/* Search Bar Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 items-center max-w-3xl rounded-md bg-white focus-within:ring-2 focus-within:ring-[#ff9900]"
        >
          <div className="relative hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 cursor-pointer rounded-l-md border-r border-gray-300 bg-gray-100 px-3 text-xs text-gray-700 transition hover:bg-gray-200 focus:outline-none appearance-none pr-7"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-3 h-4 w-4 text-gray-500" />
          </div>

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Amazon Clone..."
            className="h-10 flex-1 px-3 text-sm text-gray-900 focus:outline-none"
          />

          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setFilterState((prev) => ({ ...prev, searchQuery: "" }));
              }}
              className="px-2 text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className="flex h-10 w-11 items-center justify-center rounded-r-md bg-[#febd69] text-gray-900 transition hover:bg-[#f3a847] focus:outline-none"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Region */}
        <div className="hidden xl:flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white cursor-pointer">
          <Globe className="h-4 w-4 text-gray-300" />
          <span className="text-xs font-bold">EN</span>
        </div>

        {/* Account Menu */}
        <div className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex flex-col rounded border border-transparent p-1.5 text-left transition hover:border-white focus:outline-none"
          >
            <span className="text-[11px] text-gray-300">Hello, Sign in</span>
            <div className="flex items-center gap-0.5 font-bold text-xs">
              <span>Account & Lists</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          </button>

          {showAccountDropdown && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-md bg-white p-4 text-gray-800 shadow-xl border border-gray-200">
              <button
                onClick={() => {
                  alert("Signed in as Demo User");
                  setShowAccountDropdown(false);
                }}
                className="w-full rounded-md bg-amber-400 py-1.5 text-xs font-bold text-gray-900 shadow hover:bg-amber-500"
              >
                Sign in
              </button>
            </div>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => alert(`Saved items: ${wishlist.length}`)}
          className="hidden sm:flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white relative"
        >
          <Heart className={`h-6 w-6 ${wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-white"}`} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white focus:outline-none relative"
        >
          <div className="relative">
            <ShoppingCart className="h-8 w-8 text-white" />
            <span className="absolute -top-1 right-1/2 translate-x-1/2 font-bold text-[#f08804] text-sm">
              {totalCartCount}
            </span>
          </div>
          <span className="hidden md:inline font-bold text-xs self-end mb-1">Cart</span>
        </button>

      </div>
    </header>
  );
};

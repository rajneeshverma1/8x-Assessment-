"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/mockProducts";
import {
  Search,
  ShoppingCart,
  MapPin,
  Heart,
  ChevronDown,
  Globe,
  User as UserIcon,
  Package,
  LogOut,
  Sparkles,
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    user,
    deliveryLocation,
    products,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrdersOpen,
    setIsLocationModalOpen,
    setIsAuthModalOpen,
    setSelectedProduct,
    filterState,
    setFilterState,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(filterState.category || "All Categories");
  const [searchInput, setSearchInput] = useState(filterState.searchQuery || "");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter dynamic search autocomplete suggestions based on query
  const searchSuggestions = React.useMemo(() => {
    if (!searchInput.trim()) return [];
    const query = searchInput.toLowerCase().trim();
    return products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchCat = p.category.toLowerCase().includes(query);
      return matchTitle || matchCat;
    }).slice(0, 6);
  }, [searchInput, products]);

  // Click outside listener to close search suggestions & account dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchSuggestions(false);
    setFilterState((prev) => ({
      ...prev,
      category: selectedCategory,
      searchQuery: searchInput,
    }));
  };

  const handleSelectSuggestion = (productTitle: string) => {
    setSearchInput(productTitle);
    setShowSearchSuggestions(false);
    setFilterState((prev) => ({
      ...prev,
      category: selectedCategory,
      searchQuery: productTitle,
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

        {/* Deliver To Selector Button */}
        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="hidden lg:flex items-center gap-1 rounded border border-transparent p-1.5 text-left transition hover:border-white focus:outline-none"
        >
          <MapPin className="h-5 w-5 text-gray-300" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-gray-400">Deliver to</span>
            <span className="font-bold text-white text-sm truncate max-w-[130px]">
              {deliveryLocation}
            </span>
          </div>
        </button>

        {/* Search Bar Form & Autocomplete Suggestions */}
        <div ref={searchRef} className="relative flex flex-1 items-center max-w-3xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full items-center rounded-md bg-white focus-within:ring-2 focus-within:ring-[#ff9900]"
          >
            <div className="relative hidden sm:block">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 cursor-pointer rounded-l-md border-r border-gray-300 bg-gray-100 px-3 text-xs text-gray-700 transition hover:bg-gray-200 focus:outline-none appearance-none pr-7 font-medium"
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
              onFocus={() => setShowSearchSuggestions(true)}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSearchSuggestions(true);
              }}
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

          {/* Autocomplete Suggestions Dropdown */}
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-11 z-50 rounded-md bg-white text-gray-800 shadow-2xl border border-gray-200 overflow-hidden">
              <div className="px-3 py-1.5 bg-gray-50 text-[10px] uppercase font-bold text-gray-400 border-b">
                Suggested Search Matches
              </div>
              {searchSuggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.title)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-left text-xs hover:bg-amber-50 dark:hover:bg-zinc-100 transition border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-gray-400" />
                    <span className="font-semibold text-gray-900">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Region */}
        <div className="hidden xl:flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white cursor-pointer">
          <Globe className="h-4 w-4 text-gray-300" />
          <span className="text-xs font-bold">EN</span>
        </div>

        {/* Account Menu */}
        <div ref={accountRef} className="relative">
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex flex-col rounded border border-transparent p-1.5 text-left transition hover:border-white focus:outline-none"
          >
            <span className="text-[11px] text-gray-300">
              Hello, {user?.name ? user.name.split(" ")[0] : "Sign in"}
            </span>
            <div className="flex items-center gap-0.5 font-bold text-xs">
              <span>Account & Lists</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          </button>

          {showAccountDropdown && (
            <div className="absolute right-0 top-12 z-50 w-60 rounded-md bg-white p-4 text-gray-800 shadow-2xl border border-gray-200">
              <div className="text-center pb-3 border-b border-gray-100">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setShowAccountDropdown(false);
                  }}
                  className="w-full rounded-md bg-amber-400 py-2 text-xs font-bold text-gray-900 shadow hover:bg-amber-500 transition"
                >
                  Manage Account / Sign In
                </button>
              </div>

              <div className="py-2 space-y-1 text-xs">
                <div className="font-bold text-gray-900 text-[11px] uppercase tracking-wider text-gray-400 mb-1 px-1">
                  Your Account
                </div>
                <button
                  onClick={() => {
                    setIsOrdersOpen(true);
                    setShowAccountDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100 text-left font-medium text-gray-700"
                >
                  <Package className="h-4 w-4 text-amber-600" />
                  Your Orders & Returns
                </button>
                <button
                  onClick={() => {
                    setIsWishlistOpen(true);
                    setShowAccountDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100 text-left font-medium text-gray-700"
                >
                  <Heart className="h-4 w-4 text-red-500" />
                  Your Wishlist ({wishlist.length})
                </button>
                <button
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setShowAccountDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100 text-left font-medium text-gray-700"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Delivery Addresses
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders Direct Link */}
        <button
          onClick={() => setIsOrdersOpen(true)}
          className="hidden sm:flex flex-col rounded border border-transparent p-1.5 text-left transition hover:border-white focus:outline-none"
        >
          <span className="text-[11px] text-gray-300">Returns</span>
          <span className="font-bold text-xs">& Orders</span>
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="hidden sm:flex items-center gap-1 rounded border border-transparent p-1.5 transition hover:border-white relative"
          title="Wishlist"
        >
          <Heart className={`h-6 w-6 ${wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-white"}`} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
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

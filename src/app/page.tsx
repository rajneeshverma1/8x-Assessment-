"use client";

import React, { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedQuadrantCards } from "@/components/FeaturedQuadrantCards";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SortBar } from "@/components/SortBar";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { LocationModal } from "@/components/LocationModal";
import { AuthModal } from "@/components/AuthModal";
import { OrdersModal } from "@/components/OrdersModal";
import { WishlistModal } from "@/components/WishlistModal";
import { ToastContainer } from "@/components/Toast";

export default function Home() {
  const { products, filterState, sortOption } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        filterState.category !== "All Categories" &&
        product.category !== filterState.category
      ) {
        return false;
      }

      // Search query filter
      if (filterState.searchQuery) {
        const query = filterState.searchQuery.toLowerCase();
        const titleMatch = product.title.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const catMatch = product.category.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !catMatch) return false;
      }

      // Price filter
      if (product.price > filterState.maxPrice) return false;

      // Rating filter
      if (filterState.minRating > 0 && product.rating < filterState.minRating) {
        return false;
      }

      // Prime filter
      if (filterState.isPrimeOnly && !product.isPrime) return false;

      // Deal filter
      if (filterState.isDealOnly && !product.badge && !product.discountPercentage) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price-low-high") return a.price - b.price;
      if (sortOption === "price-high-low") return b.price - a.price;
      if (sortOption === "avg-customer-review") return b.rating - a.rating;
      if (sortOption === "newest") return b.reviewCount - a.reviewCount;
      return 0; // featured default
    });
  }, [products, filterState, sortOption]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 font-sans text-gray-900 dark:text-zinc-100 flex flex-col justify-between">
      
      {/* Top Header & Sub-nav */}
      <div>
        <Header />
        <CategoryNav />
        <HeroCarousel />
        <FeaturedQuadrantCards />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row">
            
            {/* Sidebar Filters */}
            <FilterSidebar />

            {/* Main Product Listing */}
            <div className="flex-1 space-y-4">
              <SortBar totalResults={filteredProducts.length} />
              <ProductGrid products={filteredProducts} />
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-[#131921] text-white">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full bg-[#37475a] py-3.5 text-center text-xs font-bold transition hover:bg-[#485769]"
        >
          Back to top
        </button>

        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-300">
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Get to Know Us</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Blog</li>
              <li className="hover:underline cursor-pointer">About Amazon Clone</li>
              <li className="hover:underline cursor-pointer">Investor Relations</li>
              <li className="hover:underline cursor-pointer">Amazon Devices</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Make Money with Us</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
              <li className="hover:underline cursor-pointer">Self-Publish with Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Amazon Payment Products</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Amazon Business Card</li>
              <li className="hover:underline cursor-pointer">Shop with Points</li>
              <li className="hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Let Us Help You</h4>
            <ul className="space-y-2">
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Your Orders & Returns</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Returns & Replacements</li>
              <li className="hover:underline cursor-pointer">Help & Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 bg-[#0f1111] py-8 text-center text-[11px] text-gray-400 space-y-2">
          <div className="flex justify-center gap-6 text-gray-300 font-medium">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Consumer Health Data</span>
            <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
          </div>
          <p>© 2026 Amazon E-Commerce Clone | Next.js 16 & React 19 Enterprise Architecture</p>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <LocationModal />
      <AuthModal />
      <OrdersModal />
      <WishlistModal />
      <ToastContainer />

    </div>
  );
}

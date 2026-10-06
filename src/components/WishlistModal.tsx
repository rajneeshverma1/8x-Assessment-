"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    setIsCartOpen,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            <h2 className="text-xl font-bold">Your Saved Wishlist ({wishlistProducts.length})</h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <Heart className="mx-auto h-16 w-16 text-gray-300 dark:text-zinc-700" />
              <h3 className="text-lg font-bold text-gray-700 dark:text-zinc-300">Your Wishlist is empty</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Explore products and click the heart icon on any product card to save items to your personal wishlist for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-2 rounded-full bg-[#ffd814] px-6 py-2 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm line-clamp-1">{product.title}</h4>
                    <span className="text-xs text-gray-500">{product.category}</span>
                    <div className="mt-1 font-extrabold text-base text-gray-900 dark:text-zinc-100">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(product);
                      toggleWishlist(product.id);
                      setIsWishlistOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-[#ffd814] px-4 py-2 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

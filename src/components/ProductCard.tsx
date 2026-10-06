"use client";

import React from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Star, Heart, ShoppingCart, Eye, Check } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useCart();
  const inWishlist = isInWishlist(product.id);

  const dollars = Math.floor(product.price);
  const cents = Math.round((product.price - dollars) * 100).toString().padStart(2, "0");

  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-xs transition hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      
      {/* Top Badges & Wishlist Heart */}
      <div className="flex items-start justify-between gap-2 mb-2 z-10">
        <div>
          {product.badge && (
            <span
              className={`inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white rounded-xs ${
                product.badge === "Deal of the Day"
                  ? "bg-red-600"
                  : product.badge === "Best Seller"
                  ? "bg-[#e77600]"
                  : "bg-[#232f3e]"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-zinc-800 transition"
          aria-label="Save to Wishlist"
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* Image Gallery Preview & Quick View Trigger */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative h-48 w-full cursor-pointer overflow-hidden rounded-md bg-white p-2"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-800 shadow flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="mt-3 space-y-2">
        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-medium text-sm text-gray-900 dark:text-zinc-100 line-clamp-2 cursor-pointer hover:text-[#c7511f] hover:underline"
        >
          {product.title}
        </h3>

        {/* Customer Rating Stars */}
        <div className="flex items-center gap-1 text-xs">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-zinc-600"
                }`}
              />
            ))}
          </div>
          <span className="font-medium text-[#007185] hover:underline cursor-pointer">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Amazon Prime Check Badge */}
        {product.isPrime && (
          <div className="flex items-center gap-1 text-xs">
            <span className="font-extrabold text-[#00a8e1] tracking-tight italic text-sm">prime</span>
            <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">FREE Delivery</span>
          </div>
        )}

        {/* Amazon Pricing Format */}
        <div className="pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-semibold self-start mt-0.5">$</span>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-50">
              {dollars}
            </span>
            <span className="text-xs font-bold self-start mt-0.5">{cents}</span>

            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through ml-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}

            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                ({product.discountPercentage}% off)
              </span>
            )}
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="text-[11px] text-gray-600 dark:text-zinc-400 font-medium">
          {product.estimatedDelivery}
        </div>
      </div>

      {/* Add to Cart Action Button */}
      <div className="mt-4 pt-2 border-t border-gray-100 dark:border-zinc-800">
        <button
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-2 text-xs font-bold text-gray-900 shadow transition hover:bg-[#f7ca00] focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <ShoppingCart className="h-4 w-4 text-gray-900" />
          Add to Cart
        </button>
      </div>

    </div>
  );
};

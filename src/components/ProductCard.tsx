"use client";

import React from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Star, Heart, ShoppingCart, Check, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useCart();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      
      {/* Badge & Wishlist */}
      <div className="flex items-start justify-between">
        {product.badge ? (
          <span
            className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${
              product.badge === "Best Seller"
                ? "bg-amber-600"
                : product.badge === "Amazon's Choice"
                ? "bg-slate-900"
                : product.badge === "Deal of the Day"
                ? "bg-red-600"
                : "bg-purple-600"
            }`}
          >
            {product.badge}
          </span>
        ) : (
          <div />
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 transition dark:hover:bg-zinc-800"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      {/* Image Thumbnail */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative my-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-md cursor-pointer bg-gray-50 dark:bg-zinc-800"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md">
            <Eye className="h-4 w-4" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col space-y-1.5 flex-1">
        <h3
          onClick={() => setSelectedProduct(product)}
          className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-amber-600 cursor-pointer dark:text-zinc-100"
        >
          {product.title}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center text-amber-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${
                star <= Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : star - product.rating < 1
                  ? "fill-amber-200 text-amber-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-blue-600 font-medium">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price Tag */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold text-gray-900 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 pt-1 text-xs text-gray-600 dark:text-zinc-400">
          {product.isPrime && (
            <div className="flex items-center font-bold text-sky-600">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span className="italic text-xs font-extrabold">prime</span>
            </div>
          )}
          <span>Get it {product.estimatedDelivery}</span>
        </div>
      </div>

      {/* Cart Action */}
      <div className="mt-4 pt-2">
        <button
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-2 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00] active:scale-98 transition focus:outline-none"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>

    </div>
  );
};

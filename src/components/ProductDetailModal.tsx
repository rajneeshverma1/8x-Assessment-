"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Star, X, ShoppingCart, Heart, Check, Shield, Truck, RotateCcw } from "lucide-react";

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useCart();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.variants?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.variants?.sizes?.[0] || ""
  );

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-700">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Image Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 p-1 transition ${
                      idx === activeImageIndex
                        ? "border-amber-500 ring-2 ring-amber-300"
                        : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t text-center text-xs text-gray-600 dark:text-zinc-400">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="h-5 w-5 text-amber-500" />
                <span className="font-semibold">Fast Prime Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">30-Day Return</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span className="font-semibold">2-Year Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="flex flex-col space-y-4">
            
            {/* Category & Badge */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-blue-600 font-semibold uppercase tracking-wider dark:text-blue-400">
                {selectedProduct.category}
              </span>
              {selectedProduct.badge && (
                <span className="rounded bg-amber-500 px-2 py-0.5 font-bold text-white text-[11px]">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold leading-snug">{selectedProduct.title}</h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(selectedProduct.rating) ? "fill-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-700 dark:text-zinc-300">{selectedProduct.rating}</span>
              <span className="text-blue-600">({selectedProduct.reviewCount.toLocaleString()} ratings)</span>
            </div>

            <hr className="dark:border-zinc-800" />

            {/* Price section */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-red-600">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                {selectedProduct.discountPercentage && (
                  <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                    Save {selectedProduct.discountPercentage}%
                  </span>
                )}
              </div>
              {selectedProduct.isPrime && (
                <div className="flex items-center gap-1 font-bold text-sky-600 text-xs">
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span className="italic font-extrabold text-sm">prime</span>
                  <span className="text-gray-600 dark:text-zinc-400 font-normal">Free Delivery {selectedProduct.estimatedDelivery}</span>
                </div>
              )}
            </div>

            {/* Variants selection */}
            {selectedProduct.variants?.colors && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                  Color: <span className="font-normal text-amber-600">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {selectedProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                        selectedColor === color
                          ? "border-amber-500 bg-amber-50 text-amber-900 font-bold dark:bg-amber-950 dark:text-amber-200"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedProduct.variants?.sizes && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                  Size: <span className="font-normal text-amber-600">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {selectedProduct.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                        selectedSize === size
                          ? "border-amber-500 bg-amber-50 text-amber-900 font-bold dark:bg-amber-950 dark:text-amber-200"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-gray-700 dark:text-zinc-300">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-800 dark:bg-zinc-800 dark:text-zinc-200"
              >
                {[1, 2, 3, 4, 5, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3 text-sm font-bold text-gray-900 shadow-md hover:bg-[#f7ca00] transition active:scale-98"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Features Bullet Points */}
            <div className="border-t pt-4 dark:border-zinc-800">
              <h4 className="font-bold text-xs text-gray-900 dark:text-zinc-100 mb-2">About this item:</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600 dark:text-zinc-400">
                {selectedProduct.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

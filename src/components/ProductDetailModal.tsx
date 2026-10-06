"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Star, X, ShoppingCart, Heart, Check, Shield, Truck } from "lucide-react";

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useCart();

  if (!selectedProduct) return null;

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.variants?.colors?.[0] || ""
  );

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
        
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="h-80 w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-zinc-800 flex items-center justify-center p-4 border border-gray-200 dark:border-zinc-700">
              <img
                src={selectedProduct.images[activeImage] || selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="h-full w-full object-contain"
              />
            </div>

            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 p-1 transition ${
                      idx === activeImage ? "border-amber-500" : "border-gray-200 dark:border-zinc-700"
                    }`}
                  >
                    <img src={img} alt="thumb" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col space-y-4">
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
              {selectedProduct.category}
            </span>

            <h2 className="text-xl font-bold leading-snug">{selectedProduct.title}</h2>

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
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-red-600">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {selectedProduct.variants?.colors && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                  Color: {selectedColor}
                </label>
                <div className="flex gap-2">
                  {selectedProduct.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-md border px-3 py-1 text-xs font-medium ${
                        selectedColor === color
                          ? "border-amber-500 bg-amber-50 text-amber-900 font-bold"
                          : "border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3 text-sm font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:text-zinc-300"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

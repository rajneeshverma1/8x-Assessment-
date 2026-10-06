"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WriteReviewModal } from "@/components/WriteReviewModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  Check,
  MessageSquare,
  Zap,
} from "lucide-react";
import Image from "next/image";

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsReviewModalOpen,
    setIsCartOpen,
  } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [showDirectCheckout, setShowDirectCheckout] = useState(false);
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number>(0);

  if (!selectedProduct) return null;

  const inWishlist = isInWishlist(selectedProduct.id);

  const colors = selectedProduct.variants?.colors || [];
  const sizes = selectedProduct.variants?.sizes || [];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor || colors[0], selectedSize || sizes[0]);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor || colors[0], selectedSize || sizes[0]);
    setShowDirectCheckout(true);
  };

  const reviews = selectedProduct.reviews || [];
  const filteredReviews = reviewRatingFilter
    ? reviews.filter((r) => r.rating === reviewRatingFilter)
    : reviews;

  // Calculate rating breakdown distribution percentages
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    return { stars, count, pct };
  });

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 max-h-[92vh] flex flex-col overflow-y-auto border border-gray-200 dark:border-zinc-800">
          
          {/* Close Button */}
          <button
            onClick={() => {
              setSelectedProduct(null);
              setActiveImageIdx(0);
            }}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Top Main Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-gray-200 dark:border-zinc-800">
            
            {/* Gallery Left Column */}
            <div className="flex flex-col gap-4">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-4 dark:border-zinc-800">
                <Image
                  src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border p-1 transition ${
                        activeImageIdx === idx
                          ? "border-amber-500 ring-2 ring-amber-400"
                          : "border-gray-200 dark:border-zinc-800 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Right Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase text-[#007185] tracking-wider">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.badge && (
                    <span className="bg-[#e77600] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-xs">
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold leading-tight text-gray-900 dark:text-zinc-50">
                  {selectedProduct.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#007185] hover:underline cursor-pointer">
                    {selectedProduct.rating} ({selectedProduct.reviewCount.toLocaleString()} ratings)
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-zinc-50">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.discountPercentage && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded">
                      Save {selectedProduct.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Prime & Shipping */}
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-zinc-400">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  <span>{selectedProduct.estimatedDelivery}</span>
                  {selectedProduct.isPrime && (
                    <span className="font-bold text-[#00a8e1] tracking-tight italic">prime</span>
                  )}
                </div>

                {/* Color Variants */}
                {colors.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300">
                      Color: <span className="font-normal">{selectedColor || colors[0]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                            (selectedColor || colors[0]) === col
                              ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 font-bold"
                              : "border-gray-200 dark:border-zinc-800 hover:border-gray-300"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Variants */}
                {sizes.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300">
                      Size: <span className="font-normal">{selectedSize || sizes[0]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                            (selectedSize || sizes[0]) === sz
                              ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 font-bold"
                              : "border-gray-200 dark:border-zinc-800 hover:border-gray-300"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3 text-xs">
                  <span className="font-bold text-gray-700 dark:text-zinc-300">Quantity:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 px-3 py-1 font-bold focus:border-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>

                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    In Stock ({selectedProduct.stockCount} available)
                  </span>
                </div>

              </div>

              {/* Action Buttons (Add to Cart / Buy Now / Wishlist) */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00] transition"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffa41c] py-3 text-xs font-bold text-gray-900 shadow hover:bg-[#fa8900] transition"
                >
                  <Zap className="h-4 w-4" />
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-zinc-700 py-2.5 text-xs font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
                  {inWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
                </button>
              </div>

            </div>

          </div>

          {/* Description & Features */}
          <div className="py-6 border-b border-gray-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">About this item</h3>
            <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            <ul className="space-y-2 text-xs text-gray-700 dark:text-zinc-300 list-disc pl-5">
              {selectedProduct.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>

            {/* Specifications Table */}
            {selectedProduct.specs && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                  Technical Details
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border dark:border-zinc-800">
                      <span className="block text-[10px] text-gray-400 uppercase font-semibold">{key}</span>
                      <span className="font-medium text-gray-800 dark:text-zinc-200">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Customer Reviews Section */}
          <div className="py-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100">Customer Reviews</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-extrabold text-sm text-gray-900 dark:text-zinc-100">
                    {selectedProduct.rating} out of 5
                  </span>
                  <span className="text-xs text-gray-500">
                    ({selectedProduct.reviewCount.toLocaleString()} global ratings)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-zinc-700 px-5 py-2 text-xs font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition shadow-xs"
              >
                <MessageSquare className="h-4 w-4 text-amber-600" />
                Write a Customer Review
              </button>
            </div>

            {/* Rating Breakdown Distribution Bar Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl border dark:border-zinc-800">
              <div className="space-y-2 text-xs">
                {ratingCounts.map((item) => (
                  <button
                    key={item.stars}
                    onClick={() =>
                      setReviewRatingFilter((prev) => (prev === item.stars ? 0 : item.stars))
                    }
                    className={`flex items-center gap-3 w-full text-left p-1 rounded hover:bg-gray-200/50 dark:hover:bg-zinc-700/50 transition ${
                      reviewRatingFilter === item.stars ? "font-bold text-amber-600" : ""
                    }`}
                  >
                    <span className="w-12 text-gray-600 dark:text-zinc-400">{item.stars} star</span>
                    <div className="flex-1 h-3 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-medium text-gray-500">{item.pct}%</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col justify-center text-xs space-y-2 text-gray-600 dark:text-zinc-300 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-zinc-700 pt-3 sm:pt-0 sm:pl-6">
                <div className="font-bold text-gray-900 dark:text-zinc-100">Review this product</div>
                <p>Share your thoughts with other customers to help them make informed buying choices.</p>
              </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs border-b pb-2 dark:border-zinc-800">
                <span className="font-bold text-gray-700 dark:text-zinc-300">
                  Showing {filteredReviews.length} customer reviews
                </span>
                {reviewRatingFilter > 0 && (
                  <button
                    onClick={() => setReviewRatingFilter(0)}
                    className="text-amber-600 font-bold hover:underline"
                  >
                    Clear Star Filter ✕
                  </button>
                )}
              </div>

              {filteredReviews.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-500">
                  No customer reviews found matching this filter.
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="font-bold text-xs text-gray-900 dark:text-zinc-100">
                        {rev.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-zinc-100">{rev.title}</span>
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center gap-2">
                      <span>Reviewed on {rev.date}</span>
                      {rev.verifiedPurchase && (
                        <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                          <Check className="h-3 w-3" /> Verified Purchase
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-700 dark:text-zinc-300 leading-relaxed pt-1">
                      {rev.content}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Embedded Modals triggered from product detail */}
      <WriteReviewModal />
      {showDirectCheckout && <CheckoutModal onClose={() => setShowDirectCheckout(false)} />}
    </>
  );
};

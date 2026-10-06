"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Star, MessageSquare } from "lucide-react";

export const WriteReviewModal: React.FC = () => {
  const { isReviewModalOpen, setIsReviewModalOpen, selectedProduct, user, addReview } = useCart();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isReviewModalOpen || !selectedProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addReview(selectedProduct.id, {
      author: user.name || "Amazon Shopper",
      rating,
      title: title.trim(),
      content: content.trim(),
      verifiedPurchase: true,
    });

    setIsReviewModalOpen(false);
    setTitle("");
    setContent("");
    setRating(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800">
        <button
          onClick={() => setIsReviewModalOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 border-b pb-3 mb-4 dark:border-zinc-800">
          <MessageSquare className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold">Write a Customer Review</h3>
        </div>

        <div className="mb-4 text-xs font-medium text-gray-700 dark:text-zinc-300 line-clamp-1">
          Reviewing: <span className="font-bold">{selectedProduct.title}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Overall Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-zinc-600"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-amber-600">
                {rating === 5 ? "5/5 - Excellent" : `${rating}/5`}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Add a headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's most important to know?"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          {/* Written Content */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
              Add a written review
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              required
              className="w-full rounded-md border border-gray-300 p-3 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="rounded-full border border-gray-300 px-5 py-2 text-xs font-bold hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#ffd814] px-6 py-2 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

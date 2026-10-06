"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import { X, CheckCircle, CreditCard, ShieldCheck, MapPin, Sparkles } from "lucide-react";

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { cart, clearCart, finalTotal, setIsCartOpen } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState("123 Fifth Avenue, New York, NY 10001");
  const [paymentMethod, setPaymentMethod] = useState("Amazon Pay - Visa ending in 4242");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#febd69", "#ff9900", "#146eb4"],
      });
    } catch {
      // Fallback if canvas confetti fails
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setTrackingId("AMZ-" + Math.floor(100000000 + Math.random() * 900000000));
      setIsSuccess(true);
      clearCart();
      fireConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div className="flex items-center gap-2 border-b pb-3 dark:border-zinc-800">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
              <h2 className="text-lg font-bold">Secure Checkout</h2>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-300">
                <MapPin className="h-4 w-4 text-amber-600" />
                Shipping Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-300">
                <CreditCard className="h-4 w-4 text-blue-600" />
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="Amazon Pay - Visa ending in 4242">Amazon Pay - Visa **** 4242</option>
                <option value="Mastercard ending in 8812">Mastercard **** 8812</option>
                <option value="Apple Pay">Apple Pay</option>
              </select>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 border dark:border-zinc-800 dark:bg-zinc-800/50 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span>Total Items:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3 text-sm font-bold text-gray-900 shadow hover:bg-[#f7ca00] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-700" />
                  Place Your Order (${finalTotal.toFixed(2)})
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-zinc-50">
              Order Confirmed!
            </h2>
            <div className="mx-auto max-w-sm rounded-lg border bg-gray-50 p-4 text-left text-xs dark:border-zinc-800 dark:bg-zinc-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="font-mono font-bold text-amber-600">{trackingId}</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                setIsCartOpen(false);
              }}
              className="mt-4 rounded-full bg-[#ffd814] px-8 py-2.5 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

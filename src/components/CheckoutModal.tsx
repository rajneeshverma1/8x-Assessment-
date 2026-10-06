"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";
import { X, CheckCircle, CreditCard, ShieldCheck, MapPin, Sparkles, Truck, Package } from "lucide-react";
import { Order } from "@/types";

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { cart, clearCart, finalTotal, setIsCartOpen, user, deliveryLocation, addOrder, setIsOrdersOpen } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState(
    user?.address ? `${user.address}, ${user.city}, ${user.zipCode}` : deliveryLocation
  );
  const [paymentMethod, setPaymentMethod] = useState("Amazon Pay - Visa ending in 4242");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#febd69", "#ff9900", "#146eb4", "#10b981"],
      });
    } catch {
      // Fallback
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const tracking = "AMZ-" + Math.floor(100000000 + Math.random() * 900000000);
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const deliveryDateStr = tomorrow.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

      const newOrder: Order = {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        date: dateStr,
        items: [...cart],
        totalAmount: finalTotal,
        shippingAddress: address,
        paymentMethod,
        status: "Delivered",
        estimatedDeliveryDate: deliveryDateStr,
        trackingNumber: tracking,
      };

      addOrder(newOrder);
      setPlacedOrder(newOrder);
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      fireConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div className="flex items-center gap-2 border-b pb-3 dark:border-zinc-800">
              <ShieldCheck className="h-6 w-6 text-amber-500" />
              <h2 className="text-lg font-bold">Amazon Checkout</h2>
            </div>

            {/* Shipping Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-300">
                <MapPin className="h-4 w-4 text-amber-600" />
                Shipping Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 p-2.5 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-300">
                <CreditCard className="h-4 w-4 text-blue-600" />
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2.5 text-xs focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 font-medium"
              >
                <option value="Amazon Pay - Visa ending in 4242">Amazon Pay - Visa **** 4242</option>
                <option value="Mastercard ending in 8812">Mastercard **** 8812</option>
                <option value="Apple Pay / Google Pay">Apple Pay / Google Pay</option>
                <option value="NetBanking / UPI Instant">UPI / NetBanking Instant</option>
                <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
              </select>
            </div>

            {/* Items Summary Preview */}
            <div className="rounded-xl bg-gray-50 p-4 border dark:border-zinc-800 dark:bg-zinc-800/50 space-y-2 text-xs">
              <div className="font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-1">
                <Package className="h-4 w-4 text-amber-500" /> Items in Order ({cart.reduce((a, b) => a + b.quantity, 0)})
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-gray-600 dark:text-zinc-300">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="truncate max-w-[280px]">{item.quantity}x {item.product.title}</span>
                    <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between font-extrabold text-sm text-gray-900 dark:text-zinc-50">
                <span>Final Order Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3.5 text-sm font-extrabold text-gray-900 shadow hover:bg-[#f7ca00] disabled:opacity-50 transition"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-800" />
                  Place Your Order (${finalTotal.toFixed(2)})
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-emerald-500 animate-bounce" />
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-zinc-50">
              Order Confirmed & Placed!
            </h2>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              Thank you for shopping on Amazon Clone. We are preparing your order for shipment.
            </p>

            {placedOrder && (
              <div className="mx-auto max-w-sm rounded-xl border bg-gray-50 p-4 text-left text-xs dark:border-zinc-800 dark:bg-zinc-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold">#{placedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking Number:</span>
                  <span className="font-mono font-bold text-amber-600">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600">{placedOrder.estimatedDeliveryDate}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button
                onClick={() => {
                  onClose();
                  setIsCartOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="rounded-full bg-[#ffd814] px-6 py-2.5 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
              >
                View Your Orders
              </button>
              <button
                onClick={() => {
                  onClose();
                  setIsCartOpen(false);
                }}
                className="rounded-full border border-gray-300 px-6 py-2.5 text-xs font-bold hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
// Refined checkout modal UI

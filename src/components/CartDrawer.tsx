"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckoutModal } from "@/components/CheckoutModal";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Bookmark,
} from "lucide-react";
import Image from "next/image";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    deliveryFee,
    finalTotal,
    toggleWishlist,
  } = useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-over Drawer */}
        <div className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 border-l border-gray-200 dark:border-zinc-800">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold">Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 px-6 py-3 border-b border-amber-100 dark:border-amber-900/30 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium text-amber-900 dark:text-amber-300">
                  <span>Add <strong className="font-bold">${remainingForFreeShipping.toFixed(2)}</strong> for FREE Shipping</span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-amber-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <Truck className="h-4 w-4" />
                <span>Your order qualifies for FREE Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 dark:text-zinc-700" />
                <h3 className="text-base font-bold text-gray-700 dark:text-zinc-300">Your Amazon Cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Your shopping cart lives to serve. Give it purpose — fill it with electronics, clothing, books, and deals!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 rounded-full bg-[#ffd814] px-6 py-2.5 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs line-clamp-2">{item.product.title}</h4>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                      </div>
                      <div className="mt-1 font-extrabold text-sm text-gray-900 dark:text-zinc-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/50 dark:border-zinc-800">
                      <div className="flex items-center rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-l-md"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-r-md"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeFromCart(item.product.id);
                          }}
                          className="text-xs text-gray-500 hover:text-amber-600 flex items-center gap-1 font-medium"
                          title="Save for Later"
                        >
                          <Bookmark className="h-3.5 w-3.5" /> Save
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-gray-400 hover:text-red-500"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="border-t p-6 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/90 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-bold text-gray-900 dark:text-zinc-100">
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-zinc-50 pt-2 border-t dark:border-zinc-800">
                  <span>Order Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3.5 text-xs font-extrabold text-gray-900 shadow-lg hover:bg-[#f7ca00] transition"
              >
                Proceed to Checkout ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>100% Guaranteed Safe & Secure Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {showCheckoutModal && <CheckoutModal onClose={() => setShowCheckoutModal(false)} />}
    </>
  );
};
// Refined free shipping meter

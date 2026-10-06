"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, CheckCircle2 } from "lucide-react";
import { CheckoutModal } from "./CheckoutModal";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    freeShippingThreshold,
    deliveryFee,
    finalTotal,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
        <div className="w-full max-w-md bg-white text-gray-900 shadow-2xl flex flex-col h-full dark:bg-zinc-900 dark:text-zinc-100">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 dark:border-zinc-800">
            <div className="flex items-center gap-2 font-bold text-lg">
              <ShoppingBag className="h-5 w-5 text-amber-500" />
              <span>Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-amber-50 p-3 dark:bg-zinc-800/80 border-b dark:border-zinc-800 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-gray-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1 font-semibold">
                    <Truck className="h-4 w-4 text-amber-600" />
                    Add <strong className="text-amber-600">${remainingForFreeShipping.toFixed(2)}</strong> for FREE Shipping
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>Your order qualifies for FREE Prime Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-3 stroke-1" />
                <p className="font-bold text-base text-gray-800 dark:text-zinc-200">Your Amazon Cart is empty</p>
                <p className="text-xs text-gray-400 mt-1">Shop today's deals and add items to your cart</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-800/50"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="h-20 w-20 rounded-md object-contain bg-white p-1 border"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="line-clamp-2 text-xs font-semibold text-gray-900 dark:text-zinc-100">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-0.5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <span className="text-[11px] text-gray-500 block">Color: {item.selectedColor}</span>
                      )}

                      <div className="mt-1 font-bold text-sm text-gray-900 dark:text-zinc-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-gray-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-gray-400">
                        ${item.product.price.toFixed(2)} each
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
              
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-semibold text-gray-900 dark:text-zinc-100">
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 dark:text-zinc-50 pt-2 border-t dark:border-zinc-800">
                  <span>Order Total:</span>
                  <span className="text-amber-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffd814] py-3 text-sm font-bold text-gray-900 shadow hover:bg-[#f7ca00] transition active:scale-98"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-500 hover:text-red-500 underline"
              >
                Clear Cart
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
};

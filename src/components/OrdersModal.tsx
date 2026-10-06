"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Package, Truck, CheckCircle2, Clock, ExternalLink, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const OrdersModal: React.FC = () => {
  const { isOrdersOpen, setIsOrdersOpen, orders, addToCart, setIsCartOpen } = useCart();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-800 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-bold">Your Orders & Returns</h2>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 dark:text-zinc-700" />
              <h3 className="text-lg font-bold text-gray-700 dark:text-zinc-300">No orders placed yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                When you place orders on Amazon Clone, your shipment details, tracking info, and order receipts will appear right here.
              </p>
              <button
                onClick={() => setIsOrdersOpen(false)}
                className="mt-2 rounded-full bg-[#ffd814] px-6 py-2 text-xs font-bold text-gray-900 shadow hover:bg-[#f7ca00]"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 dark:bg-zinc-800/80 px-4 py-3 text-xs border-b border-gray-200 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <span className="block text-gray-500 dark:text-zinc-400 text-[10px] uppercase font-semibold">
                        ORDER PLACED
                      </span>
                      <span className="font-medium text-gray-800 dark:text-zinc-200">{order.date}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-zinc-400 text-[10px] uppercase font-semibold">
                        TOTAL
                      </span>
                      <span className="font-bold text-gray-900 dark:text-zinc-100">${order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 dark:text-zinc-400 text-[10px] uppercase font-semibold">
                        SHIP TO
                      </span>
                      <span className="font-medium text-gray-800 dark:text-zinc-200 truncate max-w-[150px]">
                        {order.shippingAddress}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-gray-500 dark:text-zinc-400 text-[10px] uppercase font-semibold">
                      ORDER # {order.id}
                    </span>
                    <span className="font-mono text-amber-600 font-bold text-[11px]">{order.trackingNumber}</span>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-3 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Delivered - {order.estimatedDeliveryDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Track Package</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 space-y-4 divide-y divide-gray-100 dark:divide-zinc-800">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 pt-3 first:pt-0 items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-xs line-clamp-2 hover:underline cursor-pointer">
                            {item.product.title}
                          </h4>
                          <div className="mt-1 text-[11px] text-gray-500">
                            Qty: <span className="font-bold text-gray-800 dark:text-zinc-200">{item.quantity}</span>
                            {item.selectedColor && ` • Color: ${item.selectedColor}`}
                            {item.selectedSize && ` • Size: ${item.selectedSize}`}
                          </div>
                          <div className="mt-0.5 text-xs font-bold text-gray-900 dark:text-zinc-100">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(item.product, item.quantity, item.selectedColor, item.selectedSize);
                          setIsCartOpen(true);
                          setIsOrdersOpen(false);
                        }}
                        className="rounded-md border border-gray-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition flex items-center gap-1"
                      >
                        Buy Again
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

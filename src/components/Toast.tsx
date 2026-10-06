"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between rounded-lg bg-gray-900 text-white p-3.5 shadow-2xl border border-gray-700 animate-slide-up"
        >
          <div className="flex items-center gap-3">
            {toast.product ? (
              <img
                src={toast.product.images[0]}
                alt={toast.product.title}
                className="h-10 w-10 rounded object-contain bg-white p-1"
              />
            ) : toast.type === "success" ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
            ) : (
              <Info className="h-6 w-6 text-sky-400 flex-shrink-0" />
            )}
            <span className="text-xs font-semibold leading-snug">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

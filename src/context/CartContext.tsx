"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, FilterState, SortOption } from "@/types";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info";
  product?: Product;
}

interface CartContextValue {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toasts: ToastItem[];
  removeToast: (id: string) => void;
  subtotal: number;
  totalSavings: number;
  freeShippingThreshold: number;
  deliveryFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const FREE_SHIPPING_MINIMUM = 35.0;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [filterState, setFilterState] = useState<FilterState>({
    category: "All Categories",
    searchQuery: "",
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    isPrimeOnly: false,
    isDealOnly: false,
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("amazon_cart_items");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("amazon_wishlist_items");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_cart_items", JSON.stringify(cart));
    } catch {
      // Storage save error handler
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_wishlist_items", JSON.stringify(wishlist));
    } catch {
      // Storage save error handler
    }
  }, [wishlist]);

  const showNotification = (message: string, type: "success" | "info" = "success", product?: Product) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, product }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prevCart];
        next[idx].quantity += quantity;
        return next;
      }
      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    showNotification(`Added to Cart`, "success", product);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showNotification(exists ? "Removed from Wishlist" : "Saved to Wishlist", exists ? "info" : "success");
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const totalSavings = cart.reduce((acc, item) => {
    return item.product.originalPrice
      ? acc + (item.product.originalPrice - item.product.price) * item.quantity
      : acc;
  }, 0);

  const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_MINIMUM ? 0 : 5.99;
  const finalTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        filterState,
        setFilterState,
        sortOption,
        setSortOption,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toasts,
        removeToast,
        subtotal,
        totalSavings,
        freeShippingThreshold: FREE_SHIPPING_MINIMUM,
        deliveryFee,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

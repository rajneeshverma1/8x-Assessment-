"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, FilterState, SortOption } from "@/types";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
  product?: Product;
}

interface CartContextType {
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
  toasts: Toast[];
  removeToast: (id: string) => void;
  subtotal: number;
  totalSavings: number;
  freeShippingThreshold: number;
  deliveryFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 35.0;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

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

  // Load from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("amazon_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("amazon_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, []);

  // Save cart & wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("amazon_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to local storage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to local storage", e);
    }
  }, [wishlist]);

  const showToast = (message: string, type: "success" | "info" = "success", product?: Product) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, product }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
    showToast(`Added to Cart: ${product.title.slice(0, 35)}...`, "success", product);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from your Wish List", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to your Wish List", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const totalSavings = cart.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
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
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        deliveryFee,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

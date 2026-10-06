"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, FilterState, SortOption, Order, User, Review } from "@/types";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info";
  product?: Product;
}

interface CartContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  user: User;
  deliveryLocation: string;
  products: Product[];
  
  // Modal visibility states
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;

  // Actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addOrder: (order: Order) => void;
  updateDeliveryLocation: (location: string) => void;
  updateUser: (user: User) => void;
  addReview: (productId: string, review: Omit<Review, "id" | "date">) => void;

  toasts: ToastItem[];
  removeToast: (id: string) => void;

  // Totals
  subtotal: number;
  totalSavings: number;
  freeShippingThreshold: number;
  deliveryFee: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const FREE_SHIPPING_MINIMUM = 35.0;

const DEFAULT_USER: User = {
  name: "Alex Mercer",
  email: "alex.mercer@example.com",
  address: "123 Fifth Avenue, Apt 4B",
  city: "New York",
  state: "NY",
  zipCode: "10001",
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [deliveryLocation, setDeliveryLocation] = useState<string>("New York 10001");

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

  // Local storage synchronization
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("amazon_cart_items");
      if (savedCart) setCart(JSON.parse(savedCart));
      
      const savedWishlist = localStorage.getItem("amazon_wishlist_items");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("amazon_orders_history");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedUser = localStorage.getItem("amazon_user_profile");
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedLocation = localStorage.getItem("amazon_delivery_loc");
      if (savedLocation) setDeliveryLocation(savedLocation);
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_cart_items", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_wishlist_items", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_orders_history", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_user_profile", JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("amazon_delivery_loc", deliveryLocation);
    } catch {}
  }, [deliveryLocation]);

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
      const idx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (idx > -1) {
        const next = [...prevCart];
        next[idx].quantity += quantity;
        return next;
      }
      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    showNotification(`Added to Shopping Cart`, "success", product);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification("Removed item from cart", "info");
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

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateDeliveryLocation = (loc: string) => {
    setDeliveryLocation(loc);
    showNotification(`Delivery location updated to ${loc}`, "info");
  };

  const updateUserProfile = (newUser: User) => {
    setUser(newUser);
    showNotification(`Account details updated`, "success");
  };

  const addReview = (productId: string, newReviewData: Omit<Review, "id" | "date">) => {
    const fullReview: Review = {
      ...newReviewData,
      id: "rev-" + Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [fullReview, ...currentReviews];
          const newCount = p.reviewCount + 1;
          const newRating = Number(
            (
              (p.rating * p.reviewCount + fullReview.rating) /
              newCount
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: newCount,
            rating: newRating,
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      const currentReviews = selectedProduct.reviews || [];
      const updatedReviews = [fullReview, ...currentReviews];
      const newCount = selectedProduct.reviewCount + 1;
      const newRating = Number(
        (
          (selectedProduct.rating * selectedProduct.reviewCount + fullReview.rating) /
          newCount
        ).toFixed(1)
      );
      setSelectedProduct({
        ...selectedProduct,
        reviews: updatedReviews,
        reviewCount: newCount,
        rating: newRating,
      });
    }

    showNotification("Thank you! Your customer review was published.", "success");
  };

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
        orders,
        user,
        deliveryLocation,
        products,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
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
        addOrder,
        updateDeliveryLocation,
        updateUser: updateUserProfile,
        addReview,
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

export type ProductBadge = "Deal of the Day" | "Best Seller" | "Amazon's Choice" | "Limited Time Deal";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  date: string;
  content: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  badge?: ProductBadge;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  inStock: boolean;
  stockCount: number;
  estimatedDelivery: string;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Out for Delivery" | "Delivered";

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: OrderStatus;
  estimatedDeliveryDate: string;
  trackingNumber: string;
}

export type SortOption = "featured" | "price-low-high" | "price-high-low" | "avg-customer-review" | "newest";

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  isPrimeOnly: boolean;
  isDealOnly: boolean;
}

export interface User {
  name: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
}
// Refined user interface metadata

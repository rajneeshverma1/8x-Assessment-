export type ProductBadge = "Deal of the Day" | "Best Seller" | "Amazon's Choice" | "Limited Time Deal";

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

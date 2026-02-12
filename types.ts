export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand: string;
  stockQuantity: number;
  lowStockThreshold: number;
  images: string[];
  thumbnail: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  products: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

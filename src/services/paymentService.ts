import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

export interface OrderData {
  customerName: string;
  customerMobile: string;
  customerAddress: {
    street: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  subtotal: number;
  tax: number;
  total: number;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, orderData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/verify-payment`, paymentData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Payment verification failed",
    );
  }
};

export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order details",
    );
  }
};

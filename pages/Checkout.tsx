import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartItem } from "../types";
import { createOrder, verifyPayment } from "../src/services/paymentService";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Address {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

const Checkout: React.FC<{ items: CartItem[] }> = ({ items }) => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "whatsapp">(
    "razorpay",
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoadingAddresses(false);
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}/profile/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const addressList = response.data.addresses;
        setAddresses(addressList);

        // Auto-select default address
        const defaultAddress = addressList.find(
          (addr: Address) => addr.isDefault,
        );
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        } else if (addressList.length > 0) {
          setSelectedAddressId(addressList[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const selectedAddress = addresses.find(
    (addr) => addr._id === selectedAddressId,
  );

  const handleSubmit = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (paymentMethod === "whatsapp") {
      handleWhatsAppOrder();
    } else {
      await handleRazorpayPayment();
    }
  };

  const handleWhatsAppOrder = () => {
    if (!selectedAddress) return;

    const businessNumber = "918058278355";

    let message = `🛍️ *New Order Request*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${selectedAddress.fullName}\n`;
    message += `Mobile: ${selectedAddress.phone}\n`;
    message += `Address: ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.postalCode}\n\n`;

    message += `📦 *Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.price.toFixed(2)} each\n`;
      message += `   Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `Tax (8%): ₹${tax.toFixed(2)}\n`;
    message += `*Total Amount: ₹${total.toFixed(2)}*\n\n`;
    message += `Please confirm this order. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp with your order details");
  };

  const handleRazorpayPayment = async () => {
    if (!selectedAddress) return;

    try {
      setIsProcessing(true);
      toast.loading("Creating order...");

      const orderData = {
        customerName: selectedAddress.fullName,
        customerMobile: selectedAddress.phone,
        customerAddress: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          postalCode: selectedAddress.postalCode,
        },
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal,
        tax,
        total,
      };

      const orderResponse = await createOrder(orderData);
      toast.dismiss();

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const razorpayKeyId =
        (import.meta.env?.VITE_RAZORPAY_KEY_ID as string) ||
        "rzp_test_your_key_id";
      const options = {
        key: razorpayKeyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: "Fashion Accessories",
        description: "Order Payment",
        order_id: orderResponse.orderId,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...");
            const verificationResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.dismiss();
            if (verificationResponse.success) {
              toast.success(
                `Payment successful! Order ID: ${verificationResponse.orderId}`,
                { duration: 5000 },
              );
              setTimeout(() => navigate("/"), 2000);
            } else {
              toast.error(
                "Payment verification failed. Please contact support.",
              );
            }
          } catch (error: any) {
            toast.dismiss();
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed: " + error.message);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: selectedAddress.fullName,
          contact: selectedAddress.phone,
        },
        theme: {
          color: "#8B5CF6",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.dismiss();
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment: " + error.message);
      setIsProcessing(false);
    }
  };

  if (isLoadingAddresses) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-icons text-5xl text-primary animate-spin">
              refresh
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center text-primary font-medium">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary border-2 border-primary mr-2 text-sm">
              1
            </span>
            Cart
          </div>
          <div className="w-12 h-0.5 bg-primary/30"></div>
          <div className="flex items-center text-primary font-bold">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white mr-2 text-sm shadow-lg">
              2
            </span>
            Address
          </div>
          <div className="w-12 h-0.5 bg-slate-200"></div>
          <div className="flex items-center text-slate-400 font-medium">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 mr-2 text-sm">
              3
            </span>
            Payment
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 items-start">
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Select Delivery Address</h2>
              <Link
                to="/profile"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <span className="material-icons text-sm">add</span>
                Add New
              </Link>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-12">
                <span className="material-icons text-6xl text-slate-200 mb-4">
                  location_off
                </span>
                <p className="text-slate-500 mb-4">No addresses saved yet</p>
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-all"
                >
                  <span className="material-icons">add</span>
                  Add Your First Address
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <label
                    key={address._id}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddressId === address._id
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{address.label}</h4>
                          {address.isDefault && (
                            <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium">
                          {address.fullName}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {address.phone}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {address.street}, {address.city}, {address.state} -{" "}
                          {address.postalCode}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="material-icons text-primary mb-2">lock</span>
              <h3 className="text-xs font-semibold">Secure</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="material-icons text-primary mb-2">
                rocket_launch
              </span>
              <h3 className="text-xs font-semibold">Fast</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="material-icons text-primary mb-2">
                support_agent
              </span>
              <h3 className="text-xs font-semibold">24/7 Support</h3>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 font-bold">
              Order Summary
            </div>
            <div className="p-6 space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded-lg object-cover"
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between font-medium">
                      <h3 className="text-sm">{item.name}</h3>
                      <p className="text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax (8%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <label className="block text-sm font-medium mb-2">
                  Select Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value as "razorpay" | "whatsapp",
                        )
                      }
                      className="mr-3"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <span className="material-icons text-primary">
                        payment
                      </span>
                      <div>
                        <p className="font-medium text-sm">Pay with Razorpay</p>
                        <p className="text-xs text-slate-500">
                          UPI, Cards, Net Banking
                        </p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={paymentMethod === "whatsapp"}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value as "razorpay" | "whatsapp",
                        )
                      }
                      className="mr-3"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <span className="material-icons text-green-600">
                        whatsapp
                      </span>
                      <div>
                        <p className="font-medium text-sm">
                          Order via WhatsApp
                        </p>
                        <p className="text-xs text-slate-500">
                          Pay on delivery
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isProcessing || !selectedAddress}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <span className="material-icons animate-spin">refresh</span>
                    Processing...
                  </>
                ) : paymentMethod === "razorpay" ? (
                  <>
                    <span className="material-icons">payment</span> Pay Now
                  </>
                ) : (
                  <>
                    <span className="material-icons">whatsapp</span> Order on
                    WhatsApp
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed px-4">
                {paymentMethod === "razorpay"
                  ? "Secure payment powered by Razorpay. Your payment information is encrypted and secure."
                  : "Redirection will occur to WhatsApp with your pre-filled details. Hit send to confirm with our team."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

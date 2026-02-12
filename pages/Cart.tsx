import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../types";
import { toast } from "sonner";

interface CartProps {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, updateQuantity, removeItem }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart{" "}
        <span className="text-lg font-normal text-slate-500 ml-2">
          ({items.length} Items)
        </span>
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <span className="material-icons text-6xl text-slate-200 mb-4">
            shopping_bag
          </span>
          <p className="text-slate-500 mb-8">Your cart is empty.</p>
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 sm:gap-6 border-b border-slate-100 dark:border-slate-800 pb-6"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="font-bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{item.device}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 px-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <span className="material-icons text-sm">remove</span>
                      </button>
                      <span className="px-3 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 px-3 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <span className="material-icons text-sm">add</span>
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeItem(item.id);
                        toast.success("Item removed from cart");
                      }}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-24 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping estimate</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax estimate</span>
                  <span className="text-slate-900 dark:text-white font-medium">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-end">
                  <span className="text-base font-semibold">Order Total</span>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-primary">
                      ₹{total.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      Including Taxes
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full mt-8 bg-primary hover:bg-primary-dark text-white rounded-xl py-4 flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-primary/30"
              >
                <span className="material-icons">whatsapp</span> Order on
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

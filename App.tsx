import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./src/context/AuthContext";
import ProtectedRoute from "./src/components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import Auth from "./src/pages/Auth";
import About from "./pages/About";
import AboutOwner from "./pages/AboutOwner";
import Profile from "./pages/Profile";
import { CartItem } from "./types";
import { useGetProductByIdQuery } from "./src/store/api/apiSlice";

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const location = useLocation();

  const addToCart = (productId: string, productData?: any, qty: number = 1) => {
    // If product data is provided, use it directly
    if (productData) {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === productId);
        if (existing) {
          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + qty }
              : item,
          );
        }
        return [
          ...prev,
          {
            id: productData._id,
            name: productData.name,
            price: productData.discountPrice || productData.price,
            image: productData.thumbnail || productData.images?.[0],
            quantity: qty,
          },
        ];
      });
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/auth";

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
            border: "1px solid var(--toast-border)",
          },
        }}
      />
      {!isAuthPage && <Navbar cartCount={cartCount} />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail addToCart={addToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart
                  items={cart}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout items={cart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about-owner"
            element={
              <ProtectedRoute>
                <AboutOwner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!location.pathname.startsWith("/admin") && !isAuthPage && <Footer />}

      {/* Floating WhatsApp Button */}
      {!location.pathname.startsWith("/admin") && !isAuthPage && (
        <a
          href="https://wa.me/your-number"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform group"
        >
          <span className="material-icons text-white text-3xl">chat</span>
          <span className="absolute right-20 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us
          </span>
        </a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

const Navbar: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const { user, logout } = useAuth();

  if (isAdmin) {
    return (
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-50 sticky top-0 shadow-sm">
        <div className="flex items-center flex-1 max-w-lg">
          <button className="md:hidden mr-4 text-slate-500">
            <span className="material-icons">menu</span>
          </button>
          <div className="relative w-full">
            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="Search orders, products..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
          >
            Storefront
          </Link>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <span className="material-icons">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary"
          >
            <img
              src="https://picsum.photos/32/32?random=auth"
              className="w-8 h-8 rounded-full border border-slate-200"
              alt="Admin"
            />
          </button>
        </div>
      </header>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="material-icons text-primary text-2xl">layers</span>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              FASHION ACCESSORIES
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              to="/products"
            >
              Shop
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              to="/about"
            >
              Story
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              to="/about-owner"
            >
              About Owner
            </Link>
            {user?.role === "admin" && (
              <Link
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                to="/admin"
              >
                Admin
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <span className="material-icons text-xl">search</span>
            </button>
            <Link
              to="/cart"
              className="p-2 text-gray-500 hover:text-primary transition-colors relative"
            >
              <span className="material-icons text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full min-w-[1.25rem]">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 text-gray-500 hover:text-primary transition-colors"
                  title="My Profile"
                >
                  <span className="material-icons text-xl">person</span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                  <span className="material-icons text-sm">logout</span>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
              >
                Sign In
              </Link>
            )}
            <button className="md:hidden p-2 text-gray-500 hover:text-primary">
              <span className="material-icons text-xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons text-primary text-xl">
                layers
              </span>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                FASHION ACCESSORIES
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Premium fashion accessories designed for the modern style
              enthusiasts. Elevating your style since 2023.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-icons">facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-icons">camera_alt</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-icons">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/products"
                >
                  iPhone Cases
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/products"
                >
                  Samsung Cases
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/products"
                >
                  AirPods
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/products"
                >
                  Laptop Sleeves
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/about"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/about-owner"
                >
                  About Owner
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  to="/about"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors"
                  href="https://www.instagram.com/fashionaccessories05/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-2">
              <input
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
                type="button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2024 Fashion Accessories. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <a
              className="hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-gray-600 dark:hover:text-gray-300"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

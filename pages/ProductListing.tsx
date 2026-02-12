import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../src/store/api/apiSlice";
import {
  PRODUCT_CATEGORIES,
  getCategoryLabel,
} from "../src/constants/categories";
import SearchBox from "../src/components/SearchBox";
import Pagination from "../src/components/Pagination";
import { useDebounce } from "../src/hooks";

const ITEMS_PER_PAGE = 9;

const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(100);

  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch products with backend filtering
  const {
    data: response,
    isLoading,
    error,
    isFetching,
  } = useGetProductsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearchQuery,
    category: selectedCategory === "All" ? "" : selectedCategory,
  });

  const products = response?.products || [];
  const totalItems = response?.total || 0;
  const totalPages = response?.totalPages || 1;

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const categories = ["All", ...PRODUCT_CATEGORIES.map((cat) => cat.value)];

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-slate-500 mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <span className="material-icons text-xs">chevron_right</span>
          </li>
          <li className="font-medium text-slate-900 dark:text-white">
            Products
          </li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            All Products
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {totalItems} products available
          </p>
        </div>

        {/* Search Box - Compact */}
        <div className="w-full sm:w-80 relative">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products..."
          />
          {isFetching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="material-icons text-primary animate-spin text-lg">
                refresh
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden lg:inline">
            Sort by:
          </span>
          <select className="form-select pl-3 pr-10 py-2 border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:ring-primary">
            <option>Newest Arrivals</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <button className="lg:hidden w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg font-medium">
            <span className="material-icons">filter_list</span> Show Filters
          </button>

          <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Category
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const categoryLabel =
                    cat === "All"
                      ? "All Products"
                      : PRODUCT_CATEGORIES.find((c) => c.value === cat)
                          ?.label || cat;

                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-primary border-slate-300 focus:ring-primary dark:bg-slate-800"
                      />
                      <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors flex-1">
                        {categoryLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Price Range
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>₹0</span>
                  <span>₹{priceRange}+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 relative">
          {/* Fetching overlay */}
          {isFetching && !isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-lg">
                <span className="material-icons text-primary animate-spin">
                  refresh
                </span>
                <span className="text-sm font-medium">Updating...</span>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <span className="material-icons text-5xl text-primary animate-spin">
                  refresh
                </span>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading products...
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <span className="material-icons text-5xl text-red-500">
                  error_outline
                </span>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Failed to load products. Please try again.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <span className="material-icons text-5xl text-gray-400">
                  {searchQuery ? "search_off" : "inventory_2"}
                </span>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? `No products found for "${searchQuery}"`
                    : "No products available in this category."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-primary hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <div
                    key={product._id}
                    className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 flex flex-col h-full"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase z-10">
                          New Arrival
                        </span>
                      )}
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={
                            product.thumbnail ||
                            product.images?.[0] ||
                            "https://via.placeholder.com/400x500"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </Link>
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <button className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white">
                          <span className="material-icons text-base">
                            shopping_cart
                          </span>{" "}
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="mb-1 text-xs text-slate-500">
                        {getCategoryLabel(product.category)}
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {product.discountPrice ? (
                            <>
                              <span className="text-lg font-bold text-slate-900 dark:text-white">
                                ₹{product.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              ₹{product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button className="text-green-600 hover:text-green-700">
                          <span className="material-icons">chat</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={totalItems}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

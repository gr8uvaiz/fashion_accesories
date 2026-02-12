import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../src/store/api/apiSlice";
import { getCategoryIcon } from "../src/constants/categories";

const Home: React.FC = () => {
  const { data: response, isLoading } = useGetProductsQuery({ limit: 100 });
  const products = response?.products || [];
  const featuredProducts = products.slice(0, 4);

  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.map((p: any) => p.category)),
  ).slice(0, 4);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero background"
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxmlfVS4y-_0WQf3kOAxGlIk8_64THNtupXK8X58_5eRuQMOaOPrv_UL2jEmPftU-GprhyKHj-qQ_PTV85KJfe_xu6uAuA9HvQqsM2P76LdDccs1a8bHMQ6zdaBkLMISrIoGe8iRG-m7Xnpgi_yph6nCGrUiuG7r9SXDD7z9aVV1xC_FWT8KFoi5vT5JKdOj5t7-1MpGL2zCvPw9ppogTgihI8W5kpUZIikkjLWzECUXwJ_yFqoPXwRS5RNRbOXwXks00R8620G1k"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent dark:from-background-dark"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/30 backdrop-blur-sm">
            New Arrival
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Precision meets <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              Protection.
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevate your style with our new premium collections. Elegant design,
            exceptional quality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/40 transform hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-base font-medium rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <span className="material-icons text-lg mr-2">play_arrow</span>{" "}
              Watch Film
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl text-primary">
                local_shipping
              </span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Free Global Shipping
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl text-primary">
                verified_user
              </span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                2-Year Warranty
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl text-primary">
                recycling
              </span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Eco-Friendly Packaging
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="material-icons text-3xl text-primary">chat</span>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Instant WhatsApp Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Shop by Category
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Browse our collection by category
              </p>
            </div>
            <Link
              className="hidden md:flex items-center text-primary font-medium hover:text-primary-dark group"
              to="/products"
            >
              View all products
              <span className="material-icons ml-1 transform group-hover:translate-x-1 transition-transform text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueCategories.length > 0 ? (
              uniqueCategories.map((category: string, i: number) => {
                const categoryProducts = products.filter(
                  (p: any) => p.category === category,
                );
                const firstProduct = categoryProducts[0];

                return (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-surface-light dark:bg-surface-dark shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={
                          firstProduct?.thumbnail ||
                          `https://picsum.photos/400/500?random=${i + 10}`
                        }
                        alt={category}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-icons text-white text-xl">
                          {getCategoryIcon(category)}
                        </span>
                        <span className="text-xs text-gray-200 font-medium">
                          {categoryProducts.length} Products
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white capitalize">
                        {category.replace(/-/g, " ")}
                      </h3>
                      <p className="text-gray-200 text-sm mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                        Explore Collection
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-4 text-center py-12 text-gray-500">
                No categories available yet
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trending Items */}
      <section className="py-24 bg-white dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trending This Week
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

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

          {!isLoading && featuredProducts.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <span className="material-icons text-5xl text-gray-400">
                  inventory_2
                </span>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  No products available yet.
                </p>
              </div>
            </div>
          )}

          {!isLoading && featuredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: any) => (
                <div key={product._id} className="group cursor-pointer">
                  <Link to={`/products/${product._id}`}>
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-background-light dark:bg-background-dark mb-4">
                      <img
                        src={
                          product.thumbnail ||
                          product.images?.[0] ||
                          "https://via.placeholder.com/400"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      <div className="absolute top-3 right-3">
                        <button className="bg-white/90 dark:bg-black/50 p-2 rounded-full shadow hover:text-primary backdrop-blur-sm">
                          <span className="material-icons text-lg">
                            favorite_border
                          </span>
                        </button>
                      </div>
                    </div>
                  </Link>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">
                          ₹{product.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-gray-900 dark:text-white">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                    <Link
                      to="/checkout"
                      className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      Quick Buy{" "}
                      <span className="material-icons text-sm">bolt</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1600/600?grayscale"
            className="w-full h-full object-cover opacity-20"
            alt="Banner"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
            Join over 10,000 satisfied customers who have upgraded their style.
            Premium materials, precision craftsmanship, and unmatched elegance.
          </p>
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary mb-1">
                10k+
              </span>
              <span className="text-sm text-gray-400 font-medium">
                Happy Customers
              </span>
            </div>
            <div className="w-px bg-gray-700 h-12 self-center hidden sm:block"></div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary mb-1">
                4.9
              </span>
              <span className="text-sm text-gray-400 font-medium">
                Average Rating
              </span>
            </div>
            <div className="w-px bg-gray-700 h-12 self-center hidden sm:block"></div>
            <div className="text-center">
              <span className="block text-4xl font-bold text-primary mb-1">
                24h
              </span>
              <span className="text-sm text-gray-400 font-medium">
                Dispatch Time
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

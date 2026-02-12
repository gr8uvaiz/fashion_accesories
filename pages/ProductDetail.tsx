import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "../src/store/api/apiSlice";
import { getCategoryLabel } from "../src/constants/categories";
import { toast } from "sonner";

const ProductDetail: React.FC<{
  addToCart: (id: string, productData?: any, qty?: number) => void;
}> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-icons text-5xl text-primary animate-spin">
              refresh
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading product...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-icons text-5xl text-red-500">
              error_outline
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Product not found
            </p>
            <Link
              to="/products"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [product.thumbnail, ...(product.images || [])].filter(
    Boolean,
  );
  const currentImage = allImages[selectedImage] || product.thumbnail;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <nav className="flex text-sm text-slate-500 mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/products" className="hover:text-primary">
              Shop
            </Link>
          </li>
          <li>
            <span className="material-icons text-xs">chevron_right</span>
          </li>
          <li className="font-medium text-slate-900 dark:text-white">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 mb-8 lg:mb-0">
          {allImages.length > 1 && (
            <div className="flex lg:flex-col gap-4 overflow-x-auto no-scrollbar lg:w-24 flex-shrink-0">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square relative rounded-lg border-2 transition-all ${selectedImage === i ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50"} overflow-hidden w-20 lg:w-full flex-shrink-0`}
                >
                  <img
                    src={img}
                    className="object-cover w-full h-full"
                    alt={`Thumbnail ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
          <div className="relative w-full aspect-[4/5] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={currentImage}
              className="w-full h-full object-cover object-center"
              alt={product.name}
            />
            <div className="absolute top-4 right-4">
              <button className="bg-white/90 dark:bg-slate-900/90 p-2 rounded-full shadow hover:text-primary">
                <span className="material-icons text-xl">favorite_border</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wide">
                {getCategoryLabel(product.category)}
              </span>
              {product.stockQuantity > 0 ? (
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {product.name}
            </h1>
            <div className="flex items-baseline space-x-4">
              {product.discountPrice ? (
                <>
                  <p className="text-3xl font-bold text-primary">
                    ₹{product.discountPrice.toFixed(2)}
                  </p>
                  <p className="text-lg text-slate-400 line-through">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    Save ₹{(product.price - product.discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <p className="text-3xl font-bold text-primary">
                  ₹{product?.price?.toFixed(2)}
                </p>
              )}
            </div>
            {product.brand && (
              <p className="mt-2 text-sm text-slate-500">
                Brand: <span className="font-medium">{product.brand}</span>
              </p>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-center">
              <h3 className="text-sm font-medium mr-6">Quantity</h3>
              <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-icons text-sm">remove</span>
                </button>
                <input
                  className="w-12 text-center border-none bg-transparent text-sm focus:ring-0 p-0"
                  readOnly
                  value={quantity}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-icons text-sm">add</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => {
                addToCart(product._id, product, quantity);
                toast.success(
                  `Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart`,
                );
              }}
              disabled={product.stockQuantity === 0}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-icons">shopping_bag</span> Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id, product, quantity);
                toast.success("Redirecting to checkout...");
                setTimeout(() => navigate("/checkout"), 100);
              }}
              disabled={product.stockQuantity === 0}
              className={`flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${product.stockQuantity === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 dark:hover:bg-slate-700"}`}
            >
              Buy Now
            </button>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 space-y-4 pt-6">
            <details
              className="group border-b border-slate-100 dark:border-slate-800 pb-4"
              open
            >
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span>Description</span>
                <span className="material-icons text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {product.description}
              </div>
            </details>
            <details className="group border-b border-slate-100 dark:border-slate-800 pb-4">
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span>Product Details</span>
                <span className="material-icons text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{getCategoryLabel(product.category)}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="font-medium">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Stock:</span>
                  <span>{product.stockQuantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={
                      product.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </details>
            <details className="group border-b border-slate-100 dark:border-slate-800 pb-4">
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span>Shipping & Returns</span>
                <span className="material-icons text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Free shipping on all orders. 30-day return policy. Contact us
                for any questions.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

// Backup of original AddProduct.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../src/store/api/apiSlice";
import ImageUpload from "../src/components/ImageUpload";
import Select from "../src/components/Select";
import RichTextEditor from "../src/components/RichTextEditor";

const CATEGORIES = [
  { value: "iphone-cases", label: "iPhone Cases" },
  { value: "samsung-cases", label: "Samsung Cases" },
  { value: "airpods", label: "AirPods Cases" },
  { value: "laptop-sleeves", label: "Laptop Sleeves" },
  { value: "accessories", label: "Accessories" },
];

const BRANDS = [
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
  { value: "standard", label: "Standard" },
  { value: "exclusive", label: "Exclusive" },
];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    stockQuantity: "",
    thumbnail: "",
    images: [] as string[],
    isActive: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.thumbnail) {
      setError("Please upload a product thumbnail");
      return;
    }

    try {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice
          ? parseFloat(formData.discountPrice)
          : undefined,
        category: formData.category,
        brand: formData.brand,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        thumbnail: formData.thumbnail,
        images: formData.images,
        isActive: formData.isActive,
      }).unwrap();

      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (err: any) {
      setError(err.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-icons">arrow_back</span>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Fill in the details below to create a new product
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-600 dark:text-green-400">
            Product created successfully! Redirecting...
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm p-8 space-y-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <RichTextEditor
            label="Product Description"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
            placeholder="Enter detailed product description..."
          />

          {/* Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount Price (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.discountPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, discountPrice: e.target.value })
                  }
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              value={formData.category}
              onChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              options={CATEGORIES}
              required
              placeholder="Select category"
            />

            <Select
              label="Brand"
              value={formData.brand}
              onChange={(value) => setFormData({ ...formData, brand: value })}
              options={BRANDS}
              required
              placeholder="Select brand"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.stockQuantity}
              onChange={(e) =>
                setFormData({ ...formData, stockQuantity: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="0"
              required
              min="0"
            />
          </div>

          {/* Thumbnail */}
          <ImageUpload
            label="Product Thumbnail"
            value={formData.thumbnail}
            onChange={(value) =>
              setFormData({ ...formData, thumbnail: value as string })
            }
            multiple={false}
            required
          />

          {/* Multiple Images */}
          <ImageUpload
            label="Product Images (Up to 5)"
            value={formData.images}
            onChange={(value) =>
              setFormData({ ...formData, images: value as string[] })
            }
            multiple={true}
            maxImages={5}
          />

          {/* Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product is Active (visible to customers)
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-icons">refresh</span>
                  Creating...
                </>
              ) : (
                <>
                  <span className="material-icons">add</span>
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

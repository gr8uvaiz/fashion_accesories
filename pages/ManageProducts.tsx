import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProductsAdminQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../src/store/api/apiSlice";
import { getCategoryLabel } from "../src/constants/categories";
import ConfirmDialog from "../src/components/ConfirmDialog";

const ManageProducts: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetAllProductsAdminQuery({});
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [filterActive, setFilterActive] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    productId: string | null;
    productName: string | null;
  }>({
    isOpen: false,
    productId: null,
    productName: null,
  });

  const handleStockUpdate = async (productId: string, newStock: number) => {
    try {
      await updateProduct({
        id: productId,
        stockQuantity: newStock,
      }).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
  };

  const handleToggleActive = async (
    productId: string,
    currentStatus: boolean,
  ) => {
    try {
      await updateProduct({
        id: productId,
        isActive: !currentStatus,
      }).unwrap();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    setConfirmDialog({ isOpen: true, productId, productName });
  };

  const confirmDeleteProduct = async () => {
    if (!confirmDialog.productId) return;

    try {
      await deleteProduct(confirmDialog.productId).unwrap();
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setConfirmDialog({ isOpen: false, productId: null, productName: null });
    }
  };

  const filteredProducts = products.filter((product: any) => {
    if (filterActive === "active") return product.isActive;
    if (filterActive === "inactive") return !product.isActive;
    return true;
  });

  const lowStockProducts = products.filter(
    (p: any) => p.stockQuantity <= (p.lowStockThreshold || 5),
  );

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <span className="material-icons text-5xl text-red-500">
              error_outline
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Failed to load products
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Manage Products
          </h1>
          <div className="flex items-center text-sm text-slate-500">
            <span>Admin</span>
            <span className="material-icons text-[14px] mx-1">
              chevron_right
            </span>
            <span className="text-primary font-medium">Products</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <span className="material-icons">add</span>
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <span className="material-icons">inventory_2</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
              <span className="material-icons">check_circle</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Active Products</p>
              <p className="text-2xl font-bold">
                {products.filter((p: any) => p.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600">
              <span className="material-icons">cancel</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Inactive Products</p>
              <p className="text-2xl font-bold">
                {products.filter((p: any) => !p.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
              <span className="material-icons">warning</span>
            </div>
            <div>
              <p className="text-sm text-slate-500">Low Stock</p>
              <p className="text-2xl font-bold">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setFilterActive("all")}
          className={`px-4 py-2 font-medium transition-colors ${
            filterActive === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          All Products ({products.length})
        </button>
        <button
          onClick={() => setFilterActive("active")}
          className={`px-4 py-2 font-medium transition-colors ${
            filterActive === "active"
              ? "text-primary border-b-2 border-primary"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Active ({products.filter((p: any) => p.isActive).length})
        </button>
        <button
          onClick={() => setFilterActive("inactive")}
          className={`px-4 py-2 font-medium transition-colors ${
            filterActive === "inactive"
              ? "text-primary border-b-2 border-primary"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          Inactive ({products.filter((p: any) => !p.isActive).length})
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold uppercase text-slate-500">
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <span className="material-icons text-4xl mb-2 block text-slate-400">
                      inventory_2
                    </span>
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product: any) => {
                  const isLowStock =
                    product.stockQuantity <= (product.lowStockThreshold || 5);
                  const isEditing = editingId === product._id;

                  return (
                    <tr
                      key={product._id}
                      className={`group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        isLowStock
                          ? "bg-orange-50/50 dark:bg-orange-900/10"
                          : ""
                      }`}
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {product.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {getCategoryLabel(product.category)}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          {product.discountPrice ? (
                            <>
                              <span className="font-medium text-slate-900 dark:text-white">
                                ₹{product.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-xs text-slate-400 line-through">
                                ₹{product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-slate-900 dark:text-white">
                              ₹{product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) =>
                                setEditStock(parseInt(e.target.value) || 0)
                              }
                              className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-sm"
                              min="0"
                            />
                            <button
                              onClick={() =>
                                handleStockUpdate(product._id, editStock)
                              }
                              className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            >
                              <span className="material-icons text-sm">
                                check
                              </span>
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <span className="material-icons text-sm">
                                close
                              </span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${
                                isLowStock
                                  ? "text-orange-600"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {product.stockQuantity}
                            </span>
                            {isLowStock && (
                              <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-[10px] font-bold rounded uppercase">
                                Low
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setEditingId(product._id);
                                setEditStock(product.stockQuantity);
                              }}
                              className="p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-all"
                            >
                              <span className="material-icons text-sm">
                                edit
                              </span>
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            handleToggleActive(product._id, product.isActive)
                          }
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            product.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/products/${product._id}`)}
                            className="p-1 hover:text-primary transition-colors"
                            title="View"
                          >
                            <span className="material-icons text-lg">
                              visibility
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(product._id, product.name)
                            }
                            className="p-1 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <span className="material-icons text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmDialog.productName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDeleteProduct}
        onCancel={() =>
          setConfirmDialog({
            isOpen: false,
            productId: null,
            productName: null,
          })
        }
      />
    </div>
  );
};

export default ManageProducts;

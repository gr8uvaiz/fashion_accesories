import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Dashboard Overview
          </h1>
          <div className="flex items-center text-sm text-slate-500">
            <span>Admin</span>
            <span className="material-icons text-[14px] mx-1">
              chevron_right
            </span>
            <span className="text-primary font-medium">Overview</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-icons">inventory_2</span>
            Manage Products
          </button>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <span className="material-icons">add</span>
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: "₹24,592.00",
            icon: "attach_money",
            color: "primary",
            trend: "+12.5%",
          },
          {
            label: "Pending Orders",
            value: "14",
            icon: "pending",
            color: "orange-500",
            trend: "Action Needed",
          },
          {
            label: "Total Orders",
            value: "1,482",
            icon: "shopping_bag",
            color: "blue-500",
            trend: "+5.2%",
          },
          {
            label: "Active Products",
            value: "120",
            icon: "inventory_2",
            color: "purple-500",
            trend: "Stock Low: 3",
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-${metric.color}`}
              >
                <span className="material-icons">{metric.icon}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${metric.trend.includes("+") ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
              >
                {metric.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">
              {metric.label}
            </h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Recent Orders via WhatsApp</h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage and track your latest WhatsApp orders.
            </p>
          </div>
          <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg">
            New Order
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold uppercase text-slate-500">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  <span className="material-icons text-4xl mb-2 block text-slate-400">
                    inbox
                  </span>
                  No orders yet. Orders will appear here when customers place
                  them.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

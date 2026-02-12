// Centralized category configuration
export const PRODUCT_CATEGORIES = [
  { value: "iphone-cases", label: "iPhone Cases", icon: "phone_iphone" },
  { value: "samsung-cases", label: "Samsung Cases", icon: "smartphone" },
  { value: "airpods", label: "AirPods Cases", icon: "headphones" },
  { value: "laptop-sleeves", label: "Laptop Sleeves", icon: "laptop" },
  { value: "accessories", label: "Accessories", icon: "shopping_bag" },
];

export const getCategoryLabel = (value: string): string => {
  const category = PRODUCT_CATEGORIES.find((cat) => cat.value === value);
  return category?.label || value;
};

export const getCategoryIcon = (value: string): string => {
  const category = PRODUCT_CATEGORIES.find((cat) => cat.value === value);
  return category?.icon || "category";
};

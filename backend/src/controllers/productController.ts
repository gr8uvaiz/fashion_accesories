import { Request, Response } from "express";
import Product from "../models/Product";

// Create Product (Admin Only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stockQuantity,
      images,
      thumbnail,
      isActive,
    } = req.body;

    // Validation
    if (!name || !description || !price || !category || !brand || !thumbnail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      category,
      brand,
      stockQuantity: stockQuantity || 0,
      images: images || [],
      thumbnail,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Products (Public - only active products with filtering)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 9, search = "", category = "" } = req.query;

    // Build query
    const query: any = { isActive: true };

    // Add search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Add category filter
    if (category && category !== "All") {
      query.category = category;
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Get products with pagination
    const products = await Product.find(query)
      .select("-images") // Exclude full images array for performance
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      products,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Products (Admin - includes inactive)
export const getAllProductsAdmin = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .select("-images")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Product (Admin Only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Product (Admin Only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRE = "7d";

// Helper function to check if email is admin
const isAdminEmail = (email: string): boolean => {
  const adminEmails = process.env.ADMIN_EMAILS || "";
  const adminList = adminEmails.split(",").map((e) => e.trim().toLowerCase());
  return adminList.includes(email.toLowerCase());
};

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine role based on email whitelist
    const role = isAdminEmail(email) ? "admin" : "user";

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update role if email is now in admin list (in case admin list changed)
    const shouldBeAdmin = isAdminEmail(email);
    if (shouldBeAdmin && user.role !== "admin") {
      user.role = "admin";
      await user.save();
    } else if (!shouldBeAdmin && user.role === "admin") {
      user.role = "user";
      await user.save();
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get current user
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout (client-side token removal, but endpoint for consistency)
export const logout = async (req: Request, res: Response) => {
  res.json({ success: true, message: "Logged out successfully" });
};

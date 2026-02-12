import express from "express";
import {
  createOrder,
  verifyPayment,
  handleWebhook,
  getOrderDetails,
  getAllOrders,
} from "../controllers/paymentController";

const router = express.Router();

// Create Razorpay order
router.post("/create-order", createOrder);

// Verify payment
router.post("/verify-payment", verifyPayment);

// Webhook endpoint (no auth required)
router.post("/webhook", handleWebhook);

// Get order details
router.get("/order/:orderId", getOrderDetails);

// Get all orders (admin)
router.get("/orders", getAllOrders);

export default router;

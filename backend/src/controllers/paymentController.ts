import { Request, Response } from "express";
import crypto from "crypto";
import { razorpayInstance, isRazorpayConfigured } from "../config/razorpay";
import Order from "../models/Order";

// Generate unique order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};

// Create Razorpay Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    // Check if Razorpay is configured
    if (!isRazorpayConfigured() || !razorpayInstance) {
      return res.status(503).json({
        success: false,
        message:
          "Payment gateway is not configured. Please add Razorpay credentials to environment variables.",
      });
    }

    const {
      customerName,
      customerMobile,
      customerAddress,
      items,
      subtotal,
      tax,
      total,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !customerMobile ||
      !customerAddress ||
      !items ||
      !total
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create order ID
    const orderId = generateOrderId();

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(total * 100), // Amount in paise
      currency: "INR",
      receipt: orderId,
      notes: {
        customerName,
        customerMobile,
      },
    });

    // Save order to database
    const order = new Order({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      customerName,
      customerMobile,
      customerAddress,
      items,
      subtotal,
      tax,
      total,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderDetails: {
        orderId: order.orderId,
        customerName: order.customerName,
      },
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Verify Payment
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters",
      });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Update order in database
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: "success",
          orderStatus: "confirmed",
        },
        { new: true },
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: order.orderId,
        order,
      });
    } else {
      // Payment verification failed
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: "failed",
        },
      );

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// Webhook handler for Razorpay events
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"] as string;

    if (webhookSecret) {
      // Verify webhook signature
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (signature !== expectedSignature) {
        return res.status(400).json({
          success: false,
          message: "Invalid webhook signature",
        });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    switch (event) {
      case "payment.captured":
        // Payment successful
        await Order.findOneAndUpdate(
          { razorpayOrderId: payload.order_id },
          {
            razorpayPaymentId: payload.id,
            paymentStatus: "success",
            orderStatus: "confirmed",
          },
        );
        console.log(`Payment captured: ${payload.id}`);
        break;

      case "payment.failed":
        // Payment failed
        await Order.findOneAndUpdate(
          { razorpayOrderId: payload.order_id },
          {
            paymentStatus: "failed",
          },
        );
        console.log(`Payment failed: ${payload.id}`);
        break;

      default:
        console.log(`Unhandled event: ${event}`);
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.status(500).json({
      success: false,
      message: "Webhook processing failed",
      error: error.message,
    });
  }
};

// Get order details
export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      $or: [{ orderId }, { razorpayOrderId: orderId }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

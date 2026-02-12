import Razorpay from "razorpay";

// Make Razorpay optional during development
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

export const razorpayInstance =
  razorpayKeyId && razorpayKeySecret
    ? new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      })
    : null;

// Helper to check if Razorpay is configured
export const isRazorpayConfigured = (): boolean => {
  return !!(razorpayKeyId && razorpayKeySecret);
};

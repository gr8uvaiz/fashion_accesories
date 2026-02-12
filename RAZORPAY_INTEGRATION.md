# Razorpay Payment Integration Guide

## Overview

This guide covers the complete Razorpay integration for the Fashion Accessories ecommerce platform, including order creation, payment verification, and webhook handling.

## Features

- ✅ Secure payment collection via UPI, Cards, and Net Banking
- ✅ No upfront or setup fees (charges only per successful transaction)
- ✅ Order creation with Razorpay
- ✅ Payment verification with signature validation
- ✅ Webhook handling for payment success/failure
- ✅ Production-ready and scalable
- ✅ Dual payment options: Razorpay + WhatsApp

## Setup Instructions

### 1. Get Razorpay Credentials

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings → API Keys
3. Generate API Keys (Test Mode for development)
4. Copy the Key ID and Key Secret

### 2. Backend Configuration

#### Install Dependencies

```bash
cd backend
npm install razorpay crypto
```

#### Environment Variables

Update `backend/.env` with your Razorpay credentials:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

#### Files Created

- `backend/src/models/Order.ts` - Order schema with payment details
- `backend/src/config/razorpay.ts` - Razorpay instance configuration
- `backend/src/controllers/paymentController.ts` - Payment logic
- `backend/src/routes/paymentRoutes.ts` - Payment API routes

### 3. Frontend Configuration

#### Install Dependencies

```bash
npm install axios --legacy-peer-deps
```

#### Environment Variables

Create `.env.local` in the root directory:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

#### Files Created

- `src/services/paymentService.ts` - Payment API service
- Updated `pages/Checkout.tsx` - Razorpay integration

### 4. Webhook Configuration

#### Setup Webhook in Razorpay Dashboard

1. Go to Settings → Webhooks
2. Add new webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events:
   - `payment.captured`
   - `payment.failed`
4. Copy the webhook secret and add to backend `.env`

#### Webhook Events Handled

- `payment.captured` - Updates order status to "confirmed"
- `payment.failed` - Updates payment status to "failed"

## API Endpoints

### Create Order

```
POST /api/payment/create-order
```

**Request Body:**

```json
{
  "customerName": "John Doe",
  "customerMobile": "9876543210",
  "customerAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "postalCode": "400001"
  },
  "items": [
    {
      "productId": "prod_123",
      "productName": "Product Name",
      "quantity": 2,
      "price": 999.99,
      "image": "image_url"
    }
  ],
  "subtotal": 1999.98,
  "tax": 159.99,
  "total": 2159.97
}
```

**Response:**

```json
{
  "success": true,
  "orderId": "order_xyz123",
  "amount": 215997,
  "currency": "INR",
  "orderDetails": {
    "orderId": "ORD-ABC123",
    "customerName": "John Doe"
  }
}
```

### Verify Payment

```
POST /api/payment/verify-payment
```

**Request Body:**

```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_hash"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "orderId": "ORD-ABC123",
  "order": {
    /* order details */
  }
}
```

### Get Order Details

```
GET /api/payment/order/:orderId
```

### Get All Orders (Admin)

```
GET /api/payment/orders
```

### Webhook Endpoint

```
POST /api/payment/webhook
```

## Payment Flow

### 1. Customer Checkout

1. Customer fills shipping details
2. Selects payment method (Razorpay or WhatsApp)
3. Clicks "Pay Now" or "Order on WhatsApp"

### 2. Razorpay Payment Flow

1. Frontend validates form
2. Calls `/api/payment/create-order` to create order
3. Razorpay checkout modal opens
4. Customer completes payment
5. Razorpay returns payment details
6. Frontend calls `/api/payment/verify-payment`
7. Backend verifies signature
8. Order status updated to "confirmed"

### 3. WhatsApp Flow

1. Frontend validates form
2. Creates formatted WhatsApp message
3. Opens WhatsApp with pre-filled message
4. Customer sends message to business

## Security Features

### Signature Verification

All payments are verified using HMAC SHA256 signature:

```typescript
const sign = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSign = crypto
  .createHmac("sha256", RAZORPAY_KEY_SECRET)
  .update(sign.toString())
  .digest("hex");
```

### Webhook Verification

Webhooks are verified using the webhook secret:

```typescript
const expectedSignature = crypto
  .createHmac("sha256", webhookSecret)
  .update(JSON.stringify(req.body))
  .digest("hex");
```

## Testing

### Test Mode

Use Razorpay test credentials for development:

- Test cards: [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- Test UPI: `success@razorpay`

### Test Payment Flow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev`
3. Add products to cart
4. Go to checkout
5. Fill shipping details
6. Select "Pay with Razorpay"
7. Use test card: `4111 1111 1111 1111`
8. CVV: Any 3 digits
9. Expiry: Any future date

## Production Deployment

### 1. Switch to Live Mode

1. Generate live API keys from Razorpay Dashboard
2. Update environment variables with live keys
3. Update webhook URL to production domain

### 2. Environment Variables

```env
# Production
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
RAZORPAY_WEBHOOK_SECRET=your_live_webhook_secret
```

### 3. SSL Certificate

Ensure your domain has a valid SSL certificate for secure payments.

### 4. Webhook URL

Update webhook URL in Razorpay Dashboard to:

```
https://yourdomain.com/api/payment/webhook
```

## Pricing

Razorpay charges per successful transaction:

- Domestic Cards: 2% + GST
- International Cards: 3% + GST
- UPI: 0% (promotional)
- Net Banking: 2% + GST
- Wallets: 2% + GST

No setup fees, no annual fees, no hidden charges.

## Error Handling

### Common Errors

1. **Invalid Signature**
   - Cause: Incorrect key secret or tampered data
   - Solution: Verify RAZORPAY_KEY_SECRET is correct

2. **Order Not Found**
   - Cause: Order ID mismatch
   - Solution: Check order creation response

3. **Payment Failed**
   - Cause: Insufficient funds, card declined, etc.
   - Solution: Customer should try different payment method

## Support

### Razorpay Documentation

- [Payment Gateway](https://razorpay.com/docs/payments/)
- [Webhooks](https://razorpay.com/docs/webhooks/)
- [API Reference](https://razorpay.com/docs/api/)

### Contact

- Razorpay Support: support@razorpay.com
- Dashboard: https://dashboard.razorpay.com/

## Best Practices

1. ✅ Always verify payment signature on backend
2. ✅ Use webhooks for reliable payment status updates
3. ✅ Store order details before payment
4. ✅ Handle payment failures gracefully
5. ✅ Use HTTPS in production
6. ✅ Keep API keys secure (never commit to git)
7. ✅ Log all payment transactions
8. ✅ Implement retry logic for failed API calls
9. ✅ Test thoroughly in test mode before going live
10. ✅ Monitor webhook delivery in Razorpay Dashboard

## Troubleshooting

### Payment Not Completing

- Check browser console for errors
- Verify Razorpay script is loaded
- Check API key is correct
- Ensure amount is in paise (multiply by 100)

### Webhook Not Receiving

- Verify webhook URL is accessible
- Check webhook secret is correct
- Review webhook logs in Razorpay Dashboard
- Ensure server is not blocking Razorpay IPs

### Signature Verification Failing

- Verify key secret matches
- Check order ID and payment ID are correct
- Ensure no extra spaces in signature

## License

This integration follows Razorpay's terms of service and API usage guidelines.

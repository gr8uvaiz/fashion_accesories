# Razorpay Integration - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Razorpay Test Credentials (2 min)

1. Go to https://dashboard.razorpay.com/signup
2. Sign up for a free account
3. Navigate to **Settings** → **API Keys**
4. Click **Generate Test Key**
5. Copy your **Key ID** and **Key Secret**

### Step 2: Configure Backend (1 min)

Edit `backend/.env` and add:

```env
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET=any_random_string_for_testing
```

### Step 3: Configure Frontend (1 min)

Edit `.env.local` and add:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

### Step 4: Start Servers (1 min)

Both servers should already be running. If not:

```bash
# Backend (in backend folder)
npm run dev

# Frontend (in root folder)
npm run dev
```

### Step 5: Test Payment

1. Open http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill in shipping details:
   - Name: Test User
   - Mobile: 9876543210
   - Address: 123 Test St
   - City: Mumbai
   - Postal Code: 400001

5. Select **"Pay with Razorpay"**
6. Click **"Pay Now"**
7. Use test card details:
   - Card Number: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date (e.g., 12/25)
   - Name: Test User

8. Click **Pay** in Razorpay modal
9. Payment success! ✅

## 🧪 Test Cards

| Card Number         | Type       | Result   |
| ------------------- | ---------- | -------- |
| 4111 1111 1111 1111 | Visa       | Success  |
| 5555 5555 5555 4444 | Mastercard | Success  |
| 4000 0000 0000 0002 | Visa       | Declined |

## 🔗 Test UPI

Use: `success@razorpay` for successful payment

## 📱 WhatsApp Option

If you prefer WhatsApp ordering:

1. Select **"Order via WhatsApp"**
2. Click **"Order on WhatsApp"**
3. WhatsApp opens with pre-filled order details
4. Click Send to place order

## ✅ What's Included

- ✅ Razorpay payment gateway integration
- ✅ Order creation and management
- ✅ Payment verification with signature
- ✅ Webhook handling for payment events
- ✅ Dual payment options (Razorpay + WhatsApp)
- ✅ Form validation
- ✅ Secure payment processing
- ✅ Production-ready code

## 🔐 Security Features

- HMAC SHA256 signature verification
- Webhook signature validation
- Secure API key handling
- HTTPS ready

## 📊 View Orders

Orders are stored in MongoDB. To view:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use fashion-accessories

# View orders
db.orders.find().pretty()
```

## 🚀 Go Live

When ready for production:

1. Generate **Live API Keys** from Razorpay Dashboard
2. Update `.env` files with live keys
3. Setup webhook URL: `https://yourdomain.com/api/payment/webhook`
4. Test with real small amount
5. Go live! 🎉

## 💰 Pricing

- No setup fees
- No monthly fees
- Pay only per successful transaction:
  - UPI: 0% (promotional)
  - Cards: 2% + GST
  - Net Banking: 2% + GST

## 📚 Full Documentation

See `RAZORPAY_INTEGRATION.md` for complete documentation.

## 🆘 Need Help?

- Razorpay Docs: https://razorpay.com/docs/
- Support: support@razorpay.com
- Dashboard: https://dashboard.razorpay.com/

## 🎯 Next Steps

1. ✅ Test payment flow
2. ✅ Test WhatsApp ordering
3. ✅ Setup webhooks
4. ✅ Customize order confirmation
5. ✅ Add email notifications
6. ✅ Go live!

Happy selling! 🛍️

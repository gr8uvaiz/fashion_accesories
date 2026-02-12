<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fashion Accessories Ecommerce Platform

A full-stack ecommerce application with integrated Razorpay payment gateway and WhatsApp ordering.

View your app in AI Studio: https://ai.studio/apps/temp/1

## ✨ Features

- 🛍️ Complete ecommerce functionality
- 💳 **Razorpay Payment Integration** (UPI, Cards, Net Banking)
- 📱 WhatsApp ordering option
- 🔐 Secure payment verification
- 📦 Order management system
- 🎨 Modern, responsive UI
- 🔒 Form validation
- 📊 Admin dashboard

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Razorpay account (free signup)

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   cd backend && npm install
   ```

2. **Configure environment variables:**

   **Frontend (`.env.local`):**

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

   **Backend (`backend/.env`):**

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fashion-accessories
   JWT_SECRET=your_secret_key
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

3. **Start the servers:**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 💳 Payment Integration

### Razorpay Setup

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your test API keys
3. Add keys to environment variables
4. Test with test cards (see documentation)

**Supported Payment Methods:**

- UPI (Google Pay, PhonePe, Paytm)
- Credit/Debit Cards
- Net Banking
- Wallets

### Documentation

- 📖 [Complete Integration Guide](RAZORPAY_INTEGRATION.md)
- ⚡ [Quick Start Guide](RAZORPAY_QUICKSTART.md)
- ✅ [Setup Complete](RAZORPAY_SETUP_COMPLETE.md)

## 🧪 Testing

### Test Payment

Use these test credentials:

- **Card:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **UPI:** success@razorpay

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   └── paymentController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   └── Order.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   └── paymentRoutes.ts
│   │   └── config/
│   │       ├── database.ts
│   │       └── razorpay.ts
│   └── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── paymentService.ts
│   └── store/
├── pages/
│   ├── Home.tsx
│   ├── ProductListing.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   └── Checkout.tsx
└── package.json
```

## 🔐 Security

- HMAC SHA256 signature verification
- Webhook signature validation
- Secure API key management
- Environment variable protection
- HTTPS ready

## 💰 Pricing

**Razorpay - No Setup Fees**

- UPI: 0% (promotional)
- Cards: 2% + GST
- Net Banking: 2% + GST
- Pay only per successful transaction

## 🚀 Production Deployment

1. Generate live Razorpay API keys
2. Update environment variables
3. Setup webhook URL
4. Enable HTTPS
5. Test with real payment
6. Go live!

## 📚 API Endpoints

### Payment APIs

- `POST /api/payment/create-order` - Create order
- `POST /api/payment/verify-payment` - Verify payment
- `POST /api/payment/webhook` - Webhook handler
- `GET /api/payment/order/:orderId` - Get order details
- `GET /api/payment/orders` - Get all orders

### Product APIs

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Auth APIs

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## 🛠️ Tech Stack

**Frontend:**

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Axios

**Backend:**

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Razorpay SDK

## 📞 Support

- Razorpay Support: support@razorpay.com
- Dashboard: https://dashboard.razorpay.com/
- Documentation: https://razorpay.com/docs/

## 📄 License

This project is licensed under the ISC License.

---

Made with ❤️ for seamless online shopping

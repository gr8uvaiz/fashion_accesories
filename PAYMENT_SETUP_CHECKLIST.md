# 🎯 Razorpay Payment Setup Checklist

Use this checklist to ensure your Razorpay integration is properly configured.

## ✅ Pre-Setup

- [ ] Node.js installed (v16+)
- [ ] MongoDB running
- [ ] Both servers can start successfully
- [ ] Products can be added to cart

## ✅ Razorpay Account Setup

- [ ] Signed up at https://dashboard.razorpay.com/
- [ ] Email verified
- [ ] Test mode enabled
- [ ] Generated test API keys
- [ ] Copied Key ID
- [ ] Copied Key Secret

## ✅ Backend Configuration

- [ ] Opened `backend/.env` file
- [ ] Added `RAZORPAY_KEY_ID=rzp_test_...`
- [ ] Added `RAZORPAY_KEY_SECRET=...`
- [ ] Added `RAZORPAY_WEBHOOK_SECRET=...`
- [ ] Saved the file
- [ ] Restarted backend server

## ✅ Frontend Configuration

- [ ] Opened `.env.local` file
- [ ] Added `VITE_RAZORPAY_KEY_ID=rzp_test_...`
- [ ] Saved the file
- [ ] Restarted frontend server

## ✅ Test Payment Flow

- [ ] Opened http://localhost:3000
- [ ] Logged in / Signed up
- [ ] Added product to cart
- [ ] Went to checkout page
- [ ] Filled shipping details:
  - [ ] Full name (min 3 chars)
  - [ ] Mobile (10 digits)
  - [ ] Address (min 10 chars)
  - [ ] City (min 2 chars)
  - [ ] Postal code (6 digits)
- [ ] Selected "Pay with Razorpay"
- [ ] Clicked "Pay Now"
- [ ] Razorpay modal opened
- [ ] Used test card: 4111 1111 1111 1111
- [ ] Entered CVV: 123
- [ ] Entered expiry: 12/25
- [ ] Clicked Pay
- [ ] Payment successful message shown
- [ ] Redirected to home page

## ✅ Verify Order in Database

- [ ] Opened MongoDB
- [ ] Connected to `fashion-accessories` database
- [ ] Checked `orders` collection
- [ ] Found the test order
- [ ] Verified `paymentStatus: "success"`
- [ ] Verified `orderStatus: "confirmed"`
- [ ] Verified `razorpayPaymentId` exists

## ✅ Test WhatsApp Flow

- [ ] Went to checkout page
- [ ] Filled shipping details
- [ ] Selected "Order via WhatsApp"
- [ ] Clicked "Order on WhatsApp"
- [ ] WhatsApp opened with pre-filled message
- [ ] Message contains all order details
- [ ] Message formatted correctly

## ✅ Test Form Validation

- [ ] Tried submitting empty form - shows errors
- [ ] Entered name < 3 chars - shows error
- [ ] Entered invalid mobile - shows error
- [ ] Entered address < 10 chars - shows error
- [ ] Entered invalid postal code - shows error
- [ ] All validations working correctly

## ✅ Test Error Scenarios

- [ ] Tested with declined card (4000 0000 0000 0002)
- [ ] Payment failed gracefully
- [ ] Error message shown
- [ ] Can retry payment
- [ ] Closed Razorpay modal - shows cancelled message

## ✅ Webhook Setup (Optional for Testing)

- [ ] Logged into Razorpay Dashboard
- [ ] Went to Settings → Webhooks
- [ ] Added webhook URL (for production)
- [ ] Selected events: payment.captured, payment.failed
- [ ] Copied webhook secret
- [ ] Updated `RAZORPAY_WEBHOOK_SECRET` in backend/.env
- [ ] Tested webhook delivery

## ✅ Code Review

- [ ] No API keys in frontend code
- [ ] All keys in environment variables
- [ ] Signature verification implemented
- [ ] Error handling in place
- [ ] Loading states working
- [ ] TypeScript errors resolved
- [ ] Console has no errors

## ✅ Documentation Review

- [ ] Read `RAZORPAY_QUICKSTART.md`
- [ ] Read `RAZORPAY_INTEGRATION.md`
- [ ] Understand payment flow
- [ ] Know how to troubleshoot
- [ ] Bookmarked Razorpay docs

## ✅ Production Readiness (Before Going Live)

- [ ] Generated live API keys
- [ ] Updated environment variables with live keys
- [ ] Tested with real small payment (₹1)
- [ ] Setup webhook URL with production domain
- [ ] Enabled HTTPS
- [ ] Tested all payment methods
- [ ] Setup monitoring
- [ ] Added order confirmation email
- [ ] Added customer notifications
- [ ] Tested refund process
- [ ] Reviewed Razorpay dashboard
- [ ] Setup automatic settlements
- [ ] Configured business details
- [ ] Added support contact info

## 🎉 All Done!

If all items are checked, your Razorpay integration is complete and ready!

### Quick Test Command

```bash
# Test payment flow
1. Add product to cart
2. Go to checkout
3. Fill details
4. Pay with test card: 4111 1111 1111 1111
5. Verify success ✅
```

### Need Help?

- 📖 See `RAZORPAY_INTEGRATION.md` for detailed guide
- ⚡ See `RAZORPAY_QUICKSTART.md` for quick setup
- 🆘 Contact: support@razorpay.com
- 📊 Dashboard: https://dashboard.razorpay.com/

---

**Status:** [ ] Testing | [ ] Production Ready | [ ] Live

**Last Updated:** ****\_\_\_****

**Notes:**

---

---

---

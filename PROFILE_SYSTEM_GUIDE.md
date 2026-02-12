# Profile Management System - Complete Guide

## 🎯 Overview

A comprehensive profile management system with modern UI, featuring:

- Profile picture upload (base64)
- Personal information management
- Address management with country/state/city selection
- Auto-fill checkout from profile data
- Modern custom select components
- Responsive design

## ✨ Features Implemented

### 1. Profile Management

- ✅ Profile picture upload and preview
- ✅ Personal information (name, email, phone, DOB, gender, bio)
- ✅ Address information (country, state, city, street, postal code)
- ✅ Tab-based navigation (Personal Info / Address)
- ✅ Real-time form validation
- ✅ Auto-save functionality

### 2. Location Selection

- ✅ Country selection (all countries)
- ✅ State selection (based on country)
- ✅ City selection (based on state)
- ✅ Searchable dropdowns
- ✅ Modern custom select UI

### 3. Checkout Integration

- ✅ Auto-fill checkout form from profile
- ✅ Pre-populated name, phone, address
- ✅ One-click checkout experience
- ✅ Manual override capability

### 4. Modern UI Components

- ✅ Custom Select with search
- ✅ Smooth animations
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Material Icons integration

## 📁 Files Created/Modified

### Backend Files

**New Files:**

- `backend/src/controllers/profileController.ts` - Profile CRUD operations
- `backend/src/routes/profileRoutes.ts` - Profile API routes

**Modified Files:**

- `backend/src/models/User.ts` - Added profile and address fields
- `backend/src/app.ts` - Added profile routes

### Frontend Files

**New Files:**

- `pages/Profile.tsx` - Main profile page
- `src/components/CustomSelect.tsx` - Modern select component

**Modified Files:**

- `pages/Checkout.tsx` - Added auto-fill from profile
- `components/Navbar.tsx` - Added profile link
- `App.tsx` - Added profile route
- `index.css` - Added custom scrollbar styles

## 🚀 Usage Guide

### Accessing Profile

1. **Via Navbar:**
   - Click the person icon in the navbar
   - Or navigate to `/profile`

2. **Profile Sections:**
   - Personal Info tab
   - Address tab

### Updating Profile

#### Personal Information

1. Click "Personal Info" tab
2. Update fields:
   - Full Name
   - Phone Number (10 digits)
   - Date of Birth
   - Gender (dropdown)
   - Bio (500 char max)
3. Click "Save Changes"

#### Profile Picture

1. Click camera icon on avatar
2. Select image file
3. Preview appears instantly
4. Click "Save Changes" to persist

#### Address Information

1. Click "Address" tab
2. Select Country (searchable)
3. Select State (auto-populated)
4. Select City (auto-populated)
5. Enter Street Address
6. Enter Postal Code
7. Click "Save Changes"

### Checkout Auto-Fill

1. Complete your profile first
2. Add items to cart
3. Go to checkout
4. Form auto-fills with profile data
5. Modify if needed
6. Complete payment

## 🎨 UI Components

### CustomSelect Component

**Features:**

- Searchable dropdown
- Keyboard navigation
- Click outside to close
- Loading states
- Error states
- Disabled states
- Dark mode support

**Usage:**

```tsx
<CustomSelect
  label="Country"
  options={countries}
  value={selectedCountry}
  onChange={(value) => setSelectedCountry(value)}
  placeholder="Select country"
  searchable={true}
/>
```

**Props:**

- `options`: Array of {value, label}
- `value`: Current selected value
- `onChange`: Callback function
- `placeholder`: Placeholder text
- `label`: Field label
- `error`: Error message
- `disabled`: Disable state
- `searchable`: Enable search

### Profile Page Layout

**Structure:**

```
┌─────────────────────────────────────┐
│           Profile Header            │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │    Main Content          │
│          │                          │
│ - Avatar │  ┌──────────────────┐   │
│ - Name   │  │  Personal Info   │   │
│ - Email  │  │  or              │   │
│          │  │  Address         │   │
│ - Tabs   │  └──────────────────┘   │
│          │                          │
│          │  [Save Changes Button]   │
└──────────┴──────────────────────────┘
```

## 🔧 API Endpoints

### Get Profile

```
GET /api/profile
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "profile": {
      "avatar": "base64_string",
      "phone": "9876543210",
      "dateOfBirth": "1990-01-01",
      "gender": "male",
      "bio": "Hello world"
    },
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "MH",
      "country": "IN",
      "postalCode": "400001"
    }
  }
}
```

### Update Profile

```
POST /api/profile
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "profile": {
    "phone": "9876543210",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "bio": "Updated bio"
  },
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "MH",
    "country": "IN",
    "postalCode": "400001"
  }
}
```

### Update Avatar

```
PUT /api/profile/avatar
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "avatar": "data:image/jpeg;base64,..."
}
```

## 🎯 User Flow

### First Time Setup

1. User registers/logs in
2. Clicks profile icon
3. Completes profile information
4. Saves changes
5. Profile ready for checkout

### Checkout Flow

1. User adds items to cart
2. Goes to checkout
3. Form auto-fills from profile
4. User reviews/modifies if needed
5. Completes payment

### Profile Update Flow

1. User clicks profile icon
2. Updates information
3. Clicks save
4. Success message shown
5. Changes reflected in checkout

## 🎨 Design Features

### Modern UI Elements

- Gradient avatar borders
- Smooth transitions
- Hover effects
- Focus states
- Loading states
- Error states

### Color Scheme

- Primary: Purple (#8B5CF6)
- Success: Green
- Error: Red
- Neutral: Slate

### Responsive Design

- Mobile: Single column
- Tablet: Adjusted spacing
- Desktop: Sidebar + content

## 🔐 Security

### Data Protection

- JWT authentication required
- User can only access own profile
- Password not returned in API
- Base64 image validation

### Validation

- Phone: 10 digits
- Postal Code: 6 digits
- Bio: Max 500 characters
- Required fields enforced

## 📱 Mobile Experience

### Optimizations

- Touch-friendly buttons
- Responsive layout
- Optimized image upload
- Smooth scrolling
- Mobile-first design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Performance

### Optimizations

- Lazy loading
- Debounced search
- Optimized re-renders
- Efficient state management
- Image compression

### Best Practices

- Use WebP for avatars
- Compress images before upload
- Limit avatar size to 2MB
- Cache profile data

## 🧪 Testing

### Manual Testing Checklist

**Profile Page:**

- [ ] Avatar upload works
- [ ] Personal info saves
- [ ] Address saves
- [ ] Country/state/city cascade works
- [ ] Search in dropdowns works
- [ ] Validation works
- [ ] Dark mode works

**Checkout Integration:**

- [ ] Form auto-fills
- [ ] Can override values
- [ ] Payment works with profile data
- [ ] WhatsApp order includes profile data

**Edge Cases:**

- [ ] Empty profile
- [ ] Partial profile
- [ ] Invalid data
- [ ] Network errors
- [ ] Large images

## 🎓 Developer Guide

### Adding New Profile Fields

1. **Update User Model:**

```typescript
// backend/src/models/User.ts
profile: {
  newField: {
    type: String,
    default: "",
  },
}
```

2. **Update Profile Page:**

```tsx
// pages/Profile.tsx
<input
  value={profileData.profile.newField}
  onChange={(e) =>
    setProfileData({
      ...profileData,
      profile: { ...profileData.profile, newField: e.target.value },
    })
  }
/>
```

3. **Update Interface:**

```typescript
interface ProfileData {
  profile: {
    newField?: string;
  };
}
```

### Customizing Select Component

```tsx
<CustomSelect
  options={customOptions}
  value={value}
  onChange={handleChange}
  placeholder="Custom placeholder"
  searchable={false} // Disable search
  disabled={true} // Disable select
  error="Error message" // Show error
/>
```

## 🐛 Troubleshooting

### Profile Not Loading

- Check authentication token
- Verify API endpoint
- Check network tab
- Verify backend is running

### Auto-Fill Not Working

- Ensure profile is complete
- Check localStorage for token
- Verify API response
- Check console for errors

### Image Upload Issues

- Check file size (< 2MB)
- Verify file type (image/\*)
- Check base64 encoding
- Verify backend accepts base64

### Dropdown Not Working

- Check country-state-city package
- Verify data structure
- Check console for errors
- Verify state dependencies

## 📚 Dependencies

### Frontend

- `country-state-city` - Location data
- `axios` - HTTP client
- `react-router-dom` - Routing

### Backend

- `mongoose` - MongoDB ODM
- `jsonwebtoken` - Authentication
- `bcryptjs` - Password hashing

## 🎉 Features Summary

✅ Complete profile management
✅ Modern custom select components
✅ Country/state/city selection
✅ Profile picture upload
✅ Auto-fill checkout
✅ Responsive design
✅ Dark mode support
✅ Form validation
✅ Error handling
✅ Loading states
✅ Smooth animations
✅ Mobile optimized

## 🚀 Next Steps

### Potential Enhancements

1. Email verification
2. Phone OTP verification
3. Multiple addresses
4. Address book
5. Profile completion progress
6. Social media links
7. Preferences/settings
8. Order history in profile
9. Wishlist integration
10. Profile sharing

---

**Profile system is complete and ready to use!** 🎊

For questions or issues, refer to the code comments or create an issue.

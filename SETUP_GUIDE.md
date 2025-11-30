# House of Clarence - Luxury Interior E-Commerce Platform

A modern, production-ready e-commerce web application for luxury interior products built with Next.js, TailwindCSS, DaisyUI, and Supabase.

## 🎨 Project Overview

**House of Clarence** is a full-stack e-commerce platform featuring:
- ✨ Clean, minimal dark theme with gold accents
- 🛍️ Product catalog with filtering and sorting
- 🛒 Shopping cart management
- 👤 User authentication (email/password)
- 💳 Order management system
- 📱 Responsive design (mobile, tablet, desktop)
- 🔐 Secure database with Row Level Security
- ⚡ Optimized performance

---

## 📁 Project Structure

```
house_of_clarence/
├── app/
│   ├── api/                    # API routes
│   │   ├── products/           # Product endpoints
│   │   ├── cart/               # Cart management
│   │   └── orders/             # Order processing
│   ├── auth/
│   │   ├── login/              # Login page
│   │   └── signup/             # Sign up page
│   ├── shop/                   # Shop page with filters
│   ├── market/                 # Market page with search
│   ├── cart/                   # Shopping cart
│   ├── profile/                # User profile
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                 # Reusable components
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── ProductCard.tsx         # Product card
│   └── CartItem.tsx            # Cart item component
├── context/                    # React context
│   └── AuthContext.tsx         # Authentication context
├── lib/                        # Utilities
│   └── supabase.ts             # Supabase client
├── public/                     # Static assets
│   └── hoc_background.png      # Hero background
├── .env.local                  # Environment variables
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── postcss.config.mjs          # PostCSS config
└── supabase_schema.sql         # Database schema
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Git

### 1. Setup Supabase

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name it "house-of-clarence"
   - Choose a region
   - Create a strong password

2. **Get Your Credentials:**
   - Go to Settings → API
   - Copy `Project URL` and `anon public` key

3. **Create Database Schema:**
   - In Supabase, go to SQL Editor
   - Create a new query
   - Copy and paste the contents of `supabase_schema.sql`
   - Click "Run"

### 2. Setup Local Environment

```bash
# Clone or navigate to your project
cd house_of_clarence

# Install dependencies
npm install

# Create .env.local file (already exists, just update it)
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env.local
```

### 3. Update Environment Variables

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📄 Database Schema

### Tables

**users**
- `id` (UUID) - User ID
- `email` (VARCHAR) - User email
- `full_name` (VARCHAR) - Full name
- `phone` (VARCHAR) - Phone number
- `address` (TEXT) - Street address
- `city`, `state`, `postal_code`, `country` - Address components
- `created_at`, `updated_at` (TIMESTAMP)

**products**
- `id` (UUID) - Product ID
- `name`, `description` - Product info
- `price` (DECIMAL) - Product price
- `category` (VARCHAR) - Product category
- `image_url` (VARCHAR) - Product image
- `stock` (INTEGER) - Available quantity
- `rating`, `review_count` - Review data
- `material`, `color`, `dimensions` - Product specs

**cart_items**
- `id` (UUID)
- `user_id` (UUID) - User reference
- `product_id` (UUID) - Product reference
- `quantity` (INTEGER) - Quantity in cart

**orders**
- `id` (UUID)
- `user_id` (UUID) - Customer
- `total_price` (DECIMAL)
- `status` (VARCHAR) - Order status
- `shipping_address` (TEXT)
- `created_at`, `updated_at`

**order_items**
- `id` (UUID)
- `order_id` (UUID) - Order reference
- `product_id` (UUID) - Product reference
- `quantity`, `price` - Item details

**reviews**
- `id` (UUID)
- `product_id`, `user_id` (UUID) - References
- `rating` (INTEGER 1-5)
- `comment` (TEXT)

---

## 🔌 API Endpoints

### Products

**GET `/api/products`**
- Fetch all products with filtering and sorting
- Query params: `category`, `sort` (newest|price|rating), `limit`

```bash
curl "http://localhost:3000/api/products?category=Furniture&sort=price&limit=10"
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Minimalist Marble Coffee Table",
    "price": 899.99,
    "category": "Furniture",
    "rating": 4.5,
    "review_count": 12
  }
]
```

### Cart

**GET `/api/cart`**
- Fetch user's cart items (requires auth)

**POST `/api/cart`**
- Add/update item in cart

```json
{
  "product_id": "uuid",
  "quantity": 2
}
```

### Orders

**GET `/api/orders`**
- Get user's order history (requires auth)

**POST `/api/orders`**
- Create new order from cart

```json
{
  "shipping_address": "123 Main St, City, State 12345"
}
```

---

## 🎨 Pages & Features

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero section, featured products, categories |
| Shop | `/shop` | Browse products with filters and sort |
| Market | `/market` | Search all products |
| Login | `/auth/login` | Email/password authentication |
| Signup | `/auth/signup` | Create new account |
| Cart | `/cart` | View and manage cart items |
| Profile | `/profile` | User profile and settings |

### Components

- **Navbar** - Navigation with cart icon and user menu
- **Footer** - Links and company info
- **ProductCard** - Product display with rating and add-to-cart
- **CartItem** - Cart item with quantity controls
- **AuthProvider** - Context for authentication state

---

## 🔐 Authentication Flow

1. User signs up with email/password
2. Supabase creates auth user
3. AuthContext manages session state
4. Protected pages redirect unauthenticated users to login
5. User session persists across page refreshes

**Protected Routes:**
- `/cart` - Requires auth
- `/profile` - Requires auth
- `/api/cart` - Requires auth
- `/api/orders` - Requires auth

---

## 🎯 Design System

### Dark Theme Colors
- **Background**: `#0a0a0a` (base-900)
- **Surface**: `#1f1f1f` (base-800)
- **Text**: `#ededed` (base-50)
- **Accent**: `#d4af37` (gold-500)
- **Primary**: `#3b82f6` (blue)

### Typography
- Headlines: Bold, large sizes
- Body: Regular weight, clean spacing
- Dark mode optimized for reduced eye strain

### Components
- DaisyUI for pre-built components (button, card, input, etc.)
- TailwindCSS for utility-first styling
- Smooth transitions and hover effects

---

## 📦 Deployment (Vercel)

### Step 1: Prepare for Deployment
```bash
# Build locally to test
npm run build

# Should see: "✓ Compiled successfully"
```

### Step 2: Push to Git (if not already)
```bash
git add .
git commit -m "Initial HOC e-commerce setup"
git push
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "Next.js" framework
5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Step 4: Update Supabase
In Supabase Auth Settings:
- Add your Vercel URL to "Allowed URLs"
- Example: `https://your-app.vercel.app`

---

## ✅ Checklist Before Going Live

- [ ] Update all `TODO:` comments in code
- [ ] Implement real cart functionality
- [ ] Add payment processing (Stripe/PayPal)
- [ ] Setup email notifications
- [ ] Configure product images
- [ ] Create admin dashboard
- [ ] Add order tracking
- [ ] Setup customer support
- [ ] Add product reviews
- [ ] Configure shipping rates
- [ ] Setup analytics (Google Analytics)
- [ ] Test on all devices
- [ ] Security audit
- [ ] Performance optimization
- [ ] SEO optimization

---

## 🚀 Future Enhancements

1. **Payment Integration**
   - Stripe for credit card payments
   - PayPal integration
   - Multiple payment methods

2. **Admin Dashboard**
   - Product management
   - Order tracking
   - Sales analytics
   - Customer management

3. **Advanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Inventory management
   - Automated email notifications
   - Coupon/discount codes
   - Product recommendations

4. **Performance**
   - Image optimization
   - Caching strategies
   - Database indexing
   - CDN integration

5. **User Experience**
   - Advanced search filters
   - Product comparison
   - Size/color variants
   - Live chat support
   - AI-powered recommendations

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS 4, DaisyUI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **Package Manager**: npm

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS](https://tailwindcss.com)
- [DaisyUI Components](https://daisyui.com)
- [React Documentation](https://react.dev)

---

## 📞 Support

For issues or questions:
1. Check the documentation above
2. Review Next.js and Supabase docs
3. Check console for error messages
4. Verify environment variables are set correctly

---

## 📄 License

This project is for personal use. Modify as needed for your business.

**Happy selling! 🎉**

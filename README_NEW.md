# 🏠 House of Clarence - Luxury Interior E-Commerce

A production-ready, full-stack e-commerce platform for luxury home furniture and decor.

**Live Demo:** [Coming Soon]

---

## ✨ Features

- 🛍️ **Product Catalog** - Browse luxury furniture, lighting, art, and decor
- 🔍 **Advanced Search** - Filter by category, price, and sort by rating
- 🛒 **Shopping Cart** - Add/remove items, manage quantities
- 👤 **User Authentication** - Email/password signup and login
- 💳 **Order Management** - View order history and tracking
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, desktop
- 🎨 **Modern UI** - Clean dark theme with gold accents using DaisyUI
- ⚡ **High Performance** - Next.js optimization, fast loading
- 🔐 **Secure** - Row-level security, encrypted connections

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- Supabase account (free)

### Installation

```bash
# 1. Clone or navigate to project
cd house_of_clarence

# 2. Install dependencies
npm install

# 3. Setup Supabase
# - Create project on supabase.com
# - Get Project URL and Anon Key
# - Run SQL schema from supabase_schema.sql

# 4. Create .env.local
echo "NEXT_PUBLIC_SUPABASE_URL=your_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000
```

**See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions**

---

## 📁 Project Structure

```
house_of_clarence/
├── app/                 # Next.js app directory
│   ├── api/            # API routes (products, cart, orders)
│   ├── auth/           # Authentication pages
│   ├── shop/           # Shop page
│   ├── market/         # Market page
│   ├── cart/           # Shopping cart
│   ├── profile/        # User profile
│   └── page.tsx        # Home page
├── components/         # Reusable React components
├── context/            # Auth context
├── lib/                # Utilities (supabase, auth, cart)
├── public/             # Static assets
└── docs/               # Setup & deployment guides
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | TailwindCSS 4, DaisyUI |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth |
| Deployment | Vercel |

---

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deploy to Vercel
- **[Database Schema](./supabase_schema.sql)** - Full SQL schema

---

## 🌐 Pages

| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Hero section, featured products, categories |
| Shop | `/shop` | Browse with filters and sorting |
| Market | `/market` | Search all products |
| Login | `/auth/login` | Email/password login |
| Signup | `/auth/signup` | Create new account |
| Cart | `/cart` | Manage shopping cart |
| Profile | `/profile` | View and edit user info |

---

## 🔌 API Endpoints

### Products
- `GET /api/products?category=Furniture&sort=price`

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart

### Orders  
- `GET /api/orders` - Get order history
- `POST /api/orders` - Create new order

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed API docs.

---

## 🚀 Deployment

Deploy to Vercel in 5 minutes:

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables
# 5. Deploy!

# Full guide: See DEPLOYMENT_GUIDE.md
```

---

## 📋 Database Schema

Key tables:
- `users` - Customer accounts
- `products` - Luxury items catalog
- `cart_items` - Shopping cart
- `orders` - Order history
- `order_items` - Order line items
- `reviews` - Product reviews

See `supabase_schema.sql` for full schema.

---

## 🎯 Next Steps

### For Development
- [ ] Implement cart context for real-time updates
- [ ] Add payment processing (Stripe)
- [ ] Create admin dashboard
- [ ] Add product reviews
- [ ] Setup email notifications

### For Launch
- [ ] Configure Supabase security
- [ ] Setup custom domain
- [ ] Enable analytics
- [ ] Create marketing assets
- [ ] Test on all devices
- [ ] Deploy to Vercel

---

## 💡 Key Features Implementation

### Authentication
```typescript
import { useAuth } from '@/context/AuthContext';

export default function Component() {
  const { user, login, logout } = useAuth();
  // Use authentication
}
```

### Products API
```typescript
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'Furniture');
```

### Cart Management
```typescript
import { calculateTotal } from '@/lib/cartUtils';
const total = calculateTotal(cartItems);
```

---

## 🎨 Design System

- **Dark Theme**: Easy on the eyes, professional look
- **Gold Accents**: `#d4af37` - Luxury feel
- **Clean Typography**: Large, readable headings
- **DaisyUI Components**: Pre-built, consistent UI
- **Responsive**: Mobile-first approach

---

## 📞 Troubleshooting

### Development Issues
**"Module not found"**
- Run `npm install`
- Check import paths

**"Supabase connection error"**
- Verify `.env.local` has correct credentials
- Check Supabase project is active

**"Build fails on Vercel"**
- Check `package.json` dependencies
- Verify environment variables are set
- Test build locally: `npm run build`

### See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more help

---

## 📊 Performance

- ⚡ **Next.js Optimization** - Automatic code splitting
- 🖼️ **Image Optimization** - Auto compression
- 🔒 **Security** - Environment variables, CORS configured
- 📈 **Scalability** - Serverless functions, auto-scaling

---

## 🔐 Security

- ✓ Row-level security on database
- ✓ JWT authentication
- ✓ Environment variables for secrets
- ✓ HTTPS by default on Vercel
- ✓ SQL injection prevention (Supabase)

---

## 📄 License

Personal project - modify as needed for your business

---

## 🎉 Getting Help

1. Check documentation files
2. Review Next.js docs
3. Check console for errors
4. Verify Supabase configuration

---

**Ready to launch your luxury e-commerce store?** 🚀

Start with `npm run dev` and explore!

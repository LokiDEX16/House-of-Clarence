# Checkout Feature - Quick Setup Reference

## 🎯 Your Checkout is Ready!

All code is complete and deployed. You just need two quick setup steps:

## Step 1️⃣: Create Database Table (3 minutes)

**Go to**: https://app.supabase.com → Your Project → SQL Editor

**Run this code**:

```sql
CREATE TABLE IF NOT EXISTS public.checkout_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  customization_comments TEXT,
  reference_images TEXT[] DEFAULT '{}',
  cart_items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  phone VARCHAR(20),
  full_name VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.checkout_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "checkout_details_read_own" ON public.checkout_details
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "checkout_details_insert_own" ON public.checkout_details
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_checkout_details_user_id ON public.checkout_details(user_id);
```

✅ Done!

## Step 2️⃣: Create Storage Bucket (2 minutes)

**Go to**: https://app.supabase.com → Your Project → Storage

**Click**: "Create a new bucket"

**Fill in**:
- Name: `checkout-images`
- Visibility: **Public** ✓
- Click: Create Bucket

✅ Done!

## 🧪 Test It!

1. Go to http://localhost:3000/shop (or your deployed URL)
2. Add any product to cart
3. Go to cart page
4. Click "Proceed to Checkout"
5. See your profile auto-populate! 
6. Add reference images
7. Click "Submit Order"
8. Check Supabase for your order in `checkout_details` table

## 📋 What You Get

| Feature | Status |
|---------|--------|
| User profile auto-fill | ✅ Done |
| File upload for images | ✅ Done |
| Customization comments | ✅ Done |
| Order saving to database | ✅ Done |
| Image storage in Supabase | ✅ Done |
| Cart integration | ✅ Done |
| Security (RLS policies) | ✅ Done |

## 🔗 Checkout Flow

```
Add to Cart → View Cart → Checkout Page → Auto-fill Profile
    ↓
Add Customization → Upload Images → Submit Order
    ↓
Images Upload to Storage → Order Saved to Database → Redirect to Profile
    ↓
Cart Cleared, Ready for Next Order
```

## 📁 Files Modified

- `app/checkout/page.tsx` - Checkout form with all features
- `app/api/checkout/route.ts` - API to save checkout
- `supabase_schema.sql` - Database schema (checkout_details table added)
- `app/cart/page.tsx` - Links to checkout

## 🐛 If Something Goes Wrong

**Images not uploading?**
- Make sure `checkout-images` bucket is **PUBLIC**
- Check bucket name is exactly: `checkout-images`

**Can't submit order?**
- Make sure `checkout_details` table exists in Supabase
- Check table name is exactly: `checkout_details`

**Form not pre-filling?**
- Make sure your user profile has data in Supabase users table
- Check if `full_name`, `address`, etc. fields have values

## 💡 Pro Tips

- Users can edit all pre-filled fields before submitting
- Multiple images can be selected at once
- Images auto-upload before checkout is saved
- Orders are organized by user via user_id
- All user data is protected with RLS policies

---

**That's it! You're ready to checkout! 🚀**

Need more details? See `CHECKOUT_SETUP_GUIDE.md` or `CHECKOUT_VERIFICATION.md`

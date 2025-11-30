# Checkout Feature Setup Guide

Your checkout page has been fully implemented with all requested features:
✅ File uploads for reference images
✅ Pre-filled shipping details from user profile
✅ Customization comments
✅ Complete order submission to database

## Prerequisites

Before the checkout feature will work, you need to complete these setup steps:

### Step 1: Create checkout_details Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste the SQL from `supabase_schema.sql` file **OR** just run this section:

```sql
-- Checkout Details Table
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

-- Enable RLS for security
ALTER TABLE public.checkout_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "checkout_details_read_own" ON public.checkout_details
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "checkout_details_insert_own" ON public.checkout_details
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_checkout_details_user_id ON public.checkout_details(user_id);
```

6. Click **Run** and confirm

### Step 2: Create Supabase Storage Bucket for Images

1. Go to **Storage** in your Supabase dashboard (left sidebar)
2. Click **Create a new bucket**
3. Name it: `checkout-images`
4. **Make it Public** (toggle on)
5. Click **Create Bucket**

### Step 3: Configure Storage Bucket Policies (Optional but Recommended)

1. Go to the `checkout-images` bucket you just created
2. Click **Policies** tab
3. Add these policies for better security:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'checkout-images' AND auth.role() = 'authenticated');

-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'checkout-images');

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'checkout-images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## What's Implemented

### Frontend Features (app/checkout/page.tsx)

1. **User Profile Pre-population**
   - Fetches user data from `users` table on page load
   - Auto-fills: Full Name, Address, City, State, Postal Code, Country, Phone
   - User can edit any field before submission

2. **File Upload for Reference Images**
   - Multiple file selection support
   - Shows selected files with remove buttons
   - Uploads to Supabase Storage (`checkout-images` bucket)
   - Generates public URLs for each image

3. **Customization Comments**
   - Textarea for special requests
   - Saved to database

4. **Order Summary**
   - Shows all cart items
   - Calculates subtotal, shipping, tax, and total
   - Free shipping on orders over $500

### Backend Features (app/api/checkout/route.ts)

1. **Checkout Submission Endpoint**
   - Receives form data from checkout page
   - Validates required fields
   - Inserts into `checkout_details` table
   - Returns success/error response

### Database Schema

**checkout_details table stores**:
- `user_id` - User's ID (for security and queries)
- `customization_comments` - Special requests/notes
- `reference_images` - Array of image URLs from Supabase Storage
- `cart_items` - Full cart data (JSONB for flexibility)
- `total_amount` - Order total
- `shipping_address` - Full shipping address
- `phone` - Phone number
- `full_name` - Customer name
- `city`, `state`, `postal_code`, `country` - Address details
- `status` - Order status (pending, processing, completed, etc.)
- `created_at`, `updated_at` - Timestamps
- Row Level Security: Users can only see/insert their own checkout details

## How to Test

1. **Add a Product to Cart**
   - Go to `/shop`
   - Click "Add to Cart" on any product

2. **Go to Checkout**
   - Go to `/cart`
   - Click "Proceed to Checkout" button

3. **Fill the Checkout Form**
   - Full Name should auto-fill (if in your profile)
   - Address fields should auto-fill (if in your profile)
   - Phone should auto-fill (if in your profile)
   - Edit any fields as needed
   - Add customization comments
   - Select reference images to upload

4. **Submit Order**
   - Click "Submit Order" button
   - Images will upload to Supabase Storage
   - Order details saved to `checkout_details` table
   - You'll be redirected to `/profile`

5. **Verify in Database**
   - Go to Supabase Dashboard
   - Go to **SQL Editor**
   - Run this query to see your checkout details:
   ```sql
   SELECT * FROM public.checkout_details ORDER BY created_at DESC LIMIT 1;
   ```

## Environment Variables

Make sure your `.env.local` has:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### "Images not uploading"
- Check if `checkout-images` bucket exists and is **public**
- Check browser console for storage errors
- Verify Supabase credentials are correct

### "Checkout not saving"
- Check if `checkout_details` table exists in Supabase
- Verify RLS policies allow INSERT
- Check backend console for errors (Vercel Logs)

### "User data not pre-filling"
- Check if your `users` table has data for current user
- Verify `users` table has the required columns (full_name, address, etc.)
- Check browser console for fetch errors

### "Phone number or address fields not showing"
- Make sure `users` table has these columns:
  - `full_name`
  - `phone`
  - `address`
  - `city`
  - `state`
  - `postal_code`
  - `country`

## Next Steps

1. Run the SQL to create `checkout_details` table
2. Create `checkout-images` storage bucket
3. Test the complete checkout flow
4. Deploy to Vercel when ready

## File Structure

```
app/
├── checkout/
│   └── page.tsx           # Checkout form page
├── api/
│   └── checkout/
│       └── route.ts       # Checkout submission endpoint
└── ...

supabase_schema.sql        # Complete database schema (includes checkout_details)
CHECKOUT_SETUP_GUIDE.md    # This file
```

Good luck! 🚀

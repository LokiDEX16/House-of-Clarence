# 🎯 STEP-BY-STEP SETUP GUIDE

## Setup Overview
```
Step 1: Create Database Table    [5 min]
         ↓
Step 2: Create Storage Bucket    [3 min]
         ↓
Step 3: Test Everything          [5 min]
         ↓
✅ Done!
```

---

## 📝 STEP 1: Create Database Table (5 minutes)

### 1.1 Open Supabase Dashboard
- Go to: https://app.supabase.com
- Login with your account
- Select your **House of Clarence** project

### 1.2 Open SQL Editor
```
Left Sidebar:
  ↓
Click "SQL Editor"
  ↓
Click "New Query" button (top right)
  ↓
You'll see a blank query editor
```

### 1.3 Copy the SQL Code

Copy **everything** between the lines below:

---

```sql
-- Create checkout_details table
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

-- Enable Row Level Security
ALTER TABLE public.checkout_details ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "checkout_details_read_own" ON public.checkout_details
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "checkout_details_insert_own" ON public.checkout_details
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_checkout_details_user_id ON public.checkout_details(user_id);
```

---

### 1.4 Paste into SQL Editor
```
SQL Editor (blank query)
  ↓
Paste the SQL code above
  ↓
You should see the entire SQL block in the editor
```

### 1.5 Run the Query
```
Click the "Run" button (bottom right of editor)
  OR
Press: Ctrl+Enter (Windows/Linux)
       Cmd+Enter (Mac)
  ↓
Wait a few seconds...
  ↓
You should see green ✅ notification at bottom
```

### 1.6 Verify It Worked
```
Left Sidebar:
  ↓
Click "Table Editor"
  ↓
Look for "checkout_details" in the list of tables
  ↓
If you see it, Task 1 is ✅ DONE!
```

---

## 📦 STEP 2: Create Storage Bucket (3 minutes)

### 2.1 Go to Storage
```
Left Sidebar:
  ↓
Click "Storage" (looks like a folder icon)
  ↓
You should see existing buckets (if any)
```

### 2.2 Create New Bucket
```
Click "Create a new bucket" button
  OR
Click "+" button if you see it
  ↓
A dialog will appear
```

### 2.3 Fill in Bucket Details
```
Dialog Form:
  ├─ Bucket name: Type exactly: checkout-images
  ├─ Visibility: Toggle the switch to PUBLIC ✓
  │            (You should see a checkmark)
  └─ Click "Create Bucket"
```

### 2.4 Verify It Worked
```
You should see "checkout-images" in the bucket list
Bucket should show: PUBLIC ✓
  ↓
If you see this, Task 2 is ✅ DONE!
```

---

## 🧪 STEP 3: Test Everything (5 minutes)

### 3.1 Start Your App
```
Terminal/Command Prompt:
  ↓
If your app is not running:
  npm run dev
  ↓
App should be running at http://localhost:3000
```

### 3.2 Browse Products
```
Visit: http://localhost:3000
  ↓
Click on "SHOP" or go to /shop
  ↓
You should see products
```

### 3.3 Add to Cart
```
Click on any product
  ↓
Click "Add to Cart" button
  ↓
You should see cart badge update
```

### 3.4 Go to Cart
```
Click on Cart icon (top right)
  OR
Go to /cart
  ↓
You should see your item
```

### 3.5 Go to Checkout
```
Click "Proceed to Checkout" button
  ↓
You should see /checkout page
  ↓
IMPORTANT: Check if form fields are pre-filled!
   - If yes: Perfect! ✅
   - If no: That's OK, you can fill manually
```

### 3.6 Fill the Form
```
Full Name: Your name (should be pre-filled)
Address: Your address (should be pre-filled)
City: Your city (should be pre-filled)
State: Your state (should be pre-filled)
Postal Code: Your zip (should be pre-filled)
Country: Your country (should be pre-filled)
Phone: Your phone (should be pre-filled)
  ↓
Add Customization Comments: Type any comments
  ↓
Upload Images: Click file input and select 1-2 images
  ↓
You should see files listed
```

### 3.7 Submit Order
```
Click "Submit Order" button
  ↓
Wait a moment (uploading images)
  ↓
You should see: "Checkout submitted successfully!"
  ↓
You should be redirected to /profile
```

### 3.8 Verify in Supabase
```
Go back to Supabase Dashboard
  ↓
Click "Table Editor"
  ↓
Click on "checkout_details" table
  ↓
You should see your order!
  ↓
Click on the row to see all details
```

### 3.9 Verify Images Uploaded
```
Go to Supabase → Storage
  ↓
Click on "checkout-images" bucket
  ↓
You should see a "checkout" folder
  ↓
Inside: A folder with your user ID
  ↓
Inside that: Your uploaded images!
```

### 3.10 Success! ✅
```
✅ Form pre-filled from profile
✅ Images uploaded to storage
✅ Order saved to database
✅ Checkout completed successfully

🎉 Your checkout system is working!
```

---

## 🐛 If Something Goes Wrong

### Problem: "Table already exists"
```
Solution: That's OK! Just ignore it.
The IF NOT EXISTS prevents errors.
Your table is already created.
```

### Problem: "Can't find checkout_details table"
```
Solution:
1. Did you click "Run"?
2. Do you see a ✅ green checkmark?
3. Try refreshing the browser
4. Try clicking Table Editor again
```

### Problem: "Can't find Storage tab"
```
Solution:
1. Make sure you're in the right project
2. Look in the left sidebar
3. Storage should be below "SQL Editor"
4. It looks like a folder icon
```

### Problem: "Images not uploading"
```
Solution:
1. Check bucket name is exactly: checkout-images
   (No spaces, exact spelling)
2. Check visibility is set to PUBLIC
   (Toggle should be ON, showing checkmark)
3. Try with a smaller image file
4. Check browser console (F12) for errors
```

### Problem: "Form not pre-filling"
```
Solution:
1. Make sure you're logged in
2. Check your user profile in Supabase:
   - Go to Table Editor
   - Click "users" table
   - Look for your row
   - Check if full_name, address, etc. have values
3. If empty, you can fill manually
4. They'll be saved for next time
```

### Problem: "Order not saving"
```
Solution:
1. Check Table Editor for checkout_details table
2. Try clicking "Run" on the SQL again
3. Check browser console (F12 key) for errors
4. Check Vercel logs if deployed:
   https://vercel.com → your project → Functions tab
```

### Problem: "Can't find /checkout page"
```
Solution:
1. Make sure your app is running (npm run dev)
2. Try visiting /shop first
3. Add product to cart
4. Then try /checkout
5. Check browser console for errors
```

---

## ✅ Final Verification Checklist

After completing all 3 steps, verify:

```
SETUP COMPLETE?
├─ □ Ran SQL in Supabase SQL Editor
├─ □ Saw ✅ green confirmation
├─ □ checkout_details table appears in Table Editor
├─ □ Created checkout-images bucket
├─ □ Bucket shows PUBLIC ✓
├─ □ Visited /checkout
├─ □ Form had pre-filled data
├─ □ Successfully uploaded images
├─ □ Successfully submitted order
├─ □ Order appears in checkout_details table
├─ □ Images appear in checkout-images bucket
└─ □ All tests passed ✅

If all checked: 🎉 YOU'RE DONE!
```

---

## 📞 Common Questions

### Q: How long does setup take?
**A**: 15 minutes total:
- SQL: 5 min
- Bucket: 3 min
- Testing: 5 min
- Extra time: 2 min buffer

### Q: Do I need to do anything else?
**A**: Only these 3 steps! Code is already done.

### Q: Can I skip the testing step?
**A**: No, testing verifies everything works before deployment.

### Q: What if I make a mistake?
**A**: No problem! Just try again. The IF NOT EXISTS prevents errors.

### Q: When can I deploy to production?
**A**: After you've completed all 3 steps and verified it works.

### Q: How do I deploy?
**A**: 
```bash
git push origin main
# Vercel auto-deploys
# Done!
```

### Q: Where is my data stored?
**A**: 
- Orders: Supabase PostgreSQL database
- Images: Supabase Storage
- Code: GitHub
- Hosted: Vercel

### Q: Is this secure?
**A**: Yes! RLS policies prevent users from seeing other users' data.

### Q: Can users edit their orders?
**A**: Not in this version. You can add that later if needed.

### Q: What about payment?
**A**: This version just takes orders. Add payment processing later if needed.

---

## 🎬 Next Steps After Setup

After you complete these 3 steps:

1. **Deploy to Production**
   ```bash
   git push origin main
   ```

2. **Share with Users**
   - Users can now checkout
   - Orders are saved
   - Images are stored

3. **Monitor**
   - Check Supabase for new orders
   - View uploaded images
   - Monitor Vercel logs

4. **Collect Feedback**
   - Ask users what they think
   - Make improvements as needed

---

## ⏱️ Time Tracker

```
Step 1: 5 min  ████░░░░░░░░░░░░░░░░  0:05
Step 2: 3 min  ███░░░░░░░░░░░░░░░░░  0:03
Step 3: 5 min  ████░░░░░░░░░░░░░░░░  0:05
─────────────────────────────────────
Total: 13 min  ████████████░░░░░░░░  0:13
```

---

## 🎯 You're Ready!

Everything is set up and ready to go. Just follow the 3 steps above and you'll have a working checkout system.

**Questions?** Refer to the documentation files:
- `ACTION_REQUIRED.md` - What to do
- `QUICK_SETUP.md` - Quick reference
- `CHECKOUT_SETUP_GUIDE.md` - Detailed guide

**Ready?** Start with Step 1 above! 👆

---

**Good luck! 🚀**

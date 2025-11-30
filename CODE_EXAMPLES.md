# 💻 Code Examples & API Documentation

Complete code examples for using House of Clarence.

---

## 🔐 Authentication

### Login Example
```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginExample() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Protected Component Example
```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedComponent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {/* Your protected content */}
    </div>
  );
}
```

---

## 📦 Database Operations

### Fetch Products
```typescript
import { supabase } from '@/lib/supabase';

// Get all products
const { data: products, error } = await supabase
  .from('products')
  .select('*');

// Get products by category
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'Furniture')
  .limit(10);

// Sort by price (low to high)
const { data } = await supabase
  .from('products')
  .select('*')
  .order('price', { ascending: true });

// Sort by rating (high to low)
const { data } = await supabase
  .from('products')
  .select('*')
  .order('rating', { ascending: false });

// Search by name (like/contains)
const { data } = await supabase
  .from('products')
  .select('*')
  .ilike('name', '%marble%'); // Case-insensitive search
```

### Fetch Single Product
```typescript
const { data: product } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .single(); // Returns single object, not array

console.log(product.name); // Can access directly
```

### Add to Cart
```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('cart_items')
  .upsert(
    {
      user_id: userId,
      product_id: productId,
      quantity: 2,
    },
    { onConflict: 'user_id,product_id' }
  )
  .select();

if (error) console.error(error);
console.log('Added to cart:', data);
```

### Get User's Cart
```typescript
const { data: cartItems } = await supabase
  .from('cart_items')
  .select('*, products(*)')
  .eq('user_id', userId);

// cartItems = [
//   {
//     id: 'uuid',
//     user_id: 'uuid',
//     product_id: 'uuid',
//     quantity: 2,
//     products: {
//       id: 'uuid',
//       name: 'Coffee Table',
//       price: 899.99,
//       ...
//     }
//   }
// ]
```

### Update User Profile
```typescript
const { data: updatedUser, error } = await supabase
  .from('users')
  .update({
    full_name: 'John Doe',
    phone: '+1234567890',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'USA',
  })
  .eq('id', userId)
  .select()
  .single();
```

---

## 🔌 API Route Examples

### Using API Routes from Client
```typescript
// Fetch products via API
const response = await fetch('/api/products?category=Furniture&sort=price');
const products = await response.json();

// Add to cart via API
const response = await fetch('/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    product_id: 'uuid-here',
    quantity: 2,
  }),
});
const result = await response.json();

// Get orders
const response = await fetch('/api/orders');
const orders = await response.json();

// Create order
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    shipping_address: '123 Main St, City, State 12345',
  }),
});
const order = await response.json();
```

---

## 🛒 Cart Utilities

### Cart Calculations
```typescript
import {
  calculateSubtotal,
  calculateTax,
  calculateShipping,
  calculateTotal,
} from '@/lib/cartUtils';

const cartItems = [
  { id: '1', product_id: 'p1', quantity: 2, price: 500 },
  { id: '2', product_id: 'p2', quantity: 1, price: 300 },
];

const subtotal = calculateSubtotal(cartItems);  // 1300
const tax = calculateTax(subtotal);              // 130
const shipping = calculateShipping(subtotal);   // 0 (free over $500)
const total = calculateTotal(cartItems);         // 1430
```

---

## ✅ Validation Utilities

### Auth Validation
```typescript
import {
  isValidEmail,
  isValidPassword,
  isAuthenticated,
  formatUserName,
} from '@/lib/authUtils';

// Email validation
isValidEmail('user@example.com');      // true
isValidEmail('invalid-email');         // false

// Password validation
isValidPassword('password123');        // true
isValidPassword('short');              // false (< 6 chars)

// Check auth
const user = { id: 'uuid', email: 'user@example.com' };
isAuthenticated(user);                 // true

// Format name
formatUserName('john@example.com');    // 'john'
```

---

## 🎨 Component Usage

### ProductCard
```typescript
import ProductCard from '@/components/ProductCard';

const product = {
  id: 'uuid',
  name: 'Marble Coffee Table',
  price: 899.99,
  image_url: '/products/table.jpg',
  rating: 4.5,
  review_count: 12,
  category: 'Furniture',
};

function App() {
  return (
    <ProductCard
      product={product}
      onAddToCart={(productId) => {
        console.log('Add to cart:', productId);
      }}
    />
  );
}
```

### CartItem
```typescript
import CartItem from '@/components/CartItem';

function CartPage() {
  return (
    <CartItem
      id="cart-item-1"
      name="Coffee Table"
      price={899.99}
      quantity={2}
      image="/products/table.jpg"
      onUpdateQuantity={(itemId, qty) => {
        console.log(`Update ${itemId} to qty ${qty}`);
      }}
      onRemove={(itemId) => {
        console.log(`Remove ${itemId}`);
      }}
    />
  );
}
```

---

## 🌐 Complete Page Example

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export default function ExamplePage() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10);

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}

      {user && (
        <div className="alert alert-info mb-6">
          Welcome, {user.email}!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-800">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🚀 API Route Example

```typescript
// app/api/example/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/example
 * Fetch something from database
 */
export async function GET(request: NextRequest) {
  try {
    // Get auth session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch data
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/example
 * Create something
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('your_table')
      .insert({
        user_id: session.user.id,
        ...body,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## 📝 TypeScript Types

```typescript
// types.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  rating: number;
  review_count: number;
  material: string;
  color: string;
  dimensions: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: string;
  updated_at: string;
}
```

---

## 🔍 Error Handling

```typescript
// Good error handling pattern

try {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Database error:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return data;
} catch (err) {
  console.error('Error:', err);
  // Show user-friendly error message
  throw err;
}
```

---

## 🧪 Testing Checklist

```typescript
// Test these scenarios

// 1. Authentication
- [ ] Can signup with new email
- [ ] Cannot signup with duplicate email
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Can logout
- [ ] Session persists on page refresh

// 2. Products
- [ ] Can fetch all products
- [ ] Can filter by category
- [ ] Can sort by price
- [ ] Can search by name

// 3. Cart
- [ ] Can add item to cart
- [ ] Can update quantity
- [ ] Can remove item
- [ ] Cart total calculates correctly
- [ ] Shipping is free over $500

// 4. Orders
- [ ] Can create order from cart
- [ ] Cart clears after order
- [ ] Can view order history
- [ ] Order shows correct total

// 5. Profile
- [ ] Can view profile info
- [ ] Can update profile
- [ ] Changes persist
```

---

**Happy coding!** 🚀

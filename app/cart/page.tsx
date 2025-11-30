'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartItem from '@/components/CartItem';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CartItemType {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      fetchCartItems();
    }
  }, [user, authLoading]);

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      // TODO: Replace with actual cart data fetched from Supabase
      // This is a placeholder for demonstration
      setCartItems([]);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    // TODO: Implement update quantity
  };

  const handleRemove = async (itemId: string) => {
    // TODO: Implement remove item
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-base-50">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="bg-base-800 rounded-lg border border-base-700 p-12 text-center">
              <p className="text-base-300 text-lg mb-6">Your cart is empty</p>
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-base-800 rounded-lg border border-base-700 p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-base-50">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-base-700">
              <div className="flex justify-between text-base-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base-300">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-xl font-bold text-gold-500">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary w-full mb-3" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>

            <Link href="/shop" className="btn btn-ghost w-full">
              Continue Shopping
            </Link>

            {subtotal < 500 && (
              <div className="alert alert-info mt-6 text-sm">
                <span>Free shipping on orders over $500! Add ${(500 - subtotal).toFixed(2)} more.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

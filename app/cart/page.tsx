'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartItem from '@/components/CartItem';
import { useEffect } from 'react';

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const { cart, loading: cartLoading, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (authLoading || cartLoading) {
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
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                  onRemove={() => removeFromCart(item.id)}
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

            <button className="btn btn-primary w-full mb-3" disabled={cart.length === 0}>
              Proceed to Checkout
            </button>

            <Link href="/shop" className="btn btn-ghost w-full">
              Continue Shopping
            </Link>

            {subtotal < 500 && subtotal > 0 && (
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

'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [customizationComments, setCustomizationComments] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>(['']);
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  const handleAddImageField = () => {
    setReferenceImages([...referenceImages, '']);
  };

  const handleRemoveImageField = (index: number) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...referenceImages];
    updated[index] = value;
    setReferenceImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || cart.length === 0) {
      alert('Cart is empty or you are not logged in');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          customization_comments: customizationComments,
          reference_images: referenceImages.filter((img) => img.trim() !== ''),
          cart_items: cart,
          total_amount: getCartTotal(),
          shipping_address: shippingAddress,
          phone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit checkout');
      }

      const data = await response.json();
      alert('Checkout submitted successfully!');
      
      // Clear cart and redirect
      await clearCart();
      router.push('/profile');
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-base-50">Checkout</h1>

      {cart.length === 0 ? (
        <div className="bg-base-800 rounded-lg border border-base-700 p-12 text-center">
          <p className="text-base-300 text-lg mb-6">Your cart is empty</p>
          <Link href="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Order Summary</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-base-300">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Shipping Address</h2>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your full shipping address..."
                  className="textarea textarea-bordered w-full bg-base-700 text-base-50"
                  rows={4}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Phone Number</h2>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number..."
                  className="input input-bordered w-full bg-base-700 text-base-50"
                  required
                />
              </div>

              {/* Customization Comments */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Customization Comments</h2>
                <textarea
                  value={customizationComments}
                  onChange={(e) => setCustomizationComments(e.target.value)}
                  placeholder="Add any special requests or customization notes here..."
                  className="textarea textarea-bordered w-full bg-base-700 text-base-50"
                  rows={4}
                />
              </div>

              {/* Reference Images */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Reference Images</h2>
                <p className="text-base-300 mb-4 text-sm">
                  Add URLs to reference images for your customization
                </p>
                <div className="space-y-3">
                  {referenceImages.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="input input-bordered flex-1 bg-base-700 text-base-50"
                      />
                      {referenceImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageField(index)}
                          className="btn btn-error btn-outline btn-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="btn btn-ghost btn-sm mt-3 w-full"
                >
                  + Add Another Image
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || cart.length === 0}
                className="btn btn-primary w-full"
              >
                {submitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base-800 rounded-lg border border-base-700 p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-base-50">Total</h2>

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

              <Link href="/cart" className="btn btn-ghost w-full">
                Back to Cart
              </Link>

              {subtotal < 500 && subtotal > 0 && (
                <div className="alert alert-info mt-6 text-sm">
                  <span>Free shipping on orders over $500! Add ${(500 - subtotal).toFixed(2)} more.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

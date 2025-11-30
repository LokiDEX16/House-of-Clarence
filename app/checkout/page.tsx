'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserProfile {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [customizationComments, setCustomizationComments] = useState('');
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      fetchUserProfile();
    }
  }, [user, authLoading, router]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setUserProfile(data);
        // Pre-fill form with user data
        setFullName(data.full_name || '');
        setPhone(data.phone || '');
        setShippingAddress(data.address || '');
        setCity(data.city || '');
        setState(data.state || '');
        setPostalCode(data.postal_code || '');
        setCountry(data.country || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReferenceImages(Array.from(e.target.files));
    }
  };

  const handleRemoveImage = (index: number) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || cart.length === 0) {
      alert('Cart is empty or you are not logged in');
      return;
    }

    if (!shippingAddress || !phone) {
      alert('Please fill in shipping address and phone number');
      return;
    }

    setSubmitting(true);

    try {
      // Upload images to Supabase storage if any
      let imageUrls: string[] = [];
      if (referenceImages.length > 0) {
        for (let i = 0; i < referenceImages.length; i++) {
          const file = referenceImages[i];
          const fileName = `checkout/${user.id}/${Date.now()}_${file.name}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('checkout-images')
            .upload(fileName, file);

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            continue;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('checkout-images')
            .getPublicUrl(fileName);

          if (urlData.publicUrl) {
            imageUrls.push(urlData.publicUrl);
          }
        }
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          customization_comments: customizationComments,
          reference_images: imageUrls,
          cart_items: cart,
          total_amount: getCartTotal(),
          shipping_address: shippingAddress,
          phone,
          full_name: fullName,
          city,
          state,
          postal_code: postalCode,
          country,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit checkout');
      }

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

  if (authLoading || loadingProfile) {
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

              {/* Full Name */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Full Name</h2>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name..."
                  className="input input-bordered w-full bg-base-700 text-base-50"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Shipping Address</h2>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your street address..."
                  className="textarea textarea-bordered w-full bg-base-700 text-base-50"
                  rows={3}
                  required
                />
              </div>

              {/* City, State, Postal Code, Country */}
              <div className="bg-base-800 rounded-lg border border-base-700 p-6">
                <h2 className="text-2xl font-bold mb-4 text-base-50">Address Details</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State/Province"
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal Code"
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                </div>
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
                  Upload reference images for your customization (JPG, PNG, etc.)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full bg-base-700 text-base-50"
                />
                {referenceImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-base-300 text-sm mb-3">Selected files:</p>
                    <div className="space-y-2">
                      {referenceImages.map((file, index) => (
                        <div key={index} className="flex justify-between items-center bg-base-700 p-2 rounded">
                          <span className="text-base-300 text-sm">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="btn btn-error btn-outline btn-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

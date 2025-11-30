'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      // TODO: Fetch actual profile from Supabase
      setProfile({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      // TODO: Update profile in Supabase
      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage('Error updating profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-base-50">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-base-800 rounded-lg border border-base-700 p-8">
            <h2 className="text-2xl font-bold mb-6 text-base-50">Personal Information</h2>

            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'} mb-6`}>
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              {/* Email (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-50">Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input input-bordered bg-base-700 text-base-400"
                />
              </div>

              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-50">Full Name</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleChange}
                  className="input input-bordered bg-base-700 text-base-50"
                />
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-50">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="input input-bordered bg-base-700 text-base-50"
                />
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-50">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="input input-bordered bg-base-700 text-base-50"
                />
              </div>

              {/* City, State, Postal Code */}
              <div className="grid grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-50">City</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-50">State</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-50">Postal Code</span>
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={profile.postal_code}
                    onChange={handleChange}
                    className="input input-bordered bg-base-700 text-base-50"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-50">Country</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  className="input input-bordered bg-base-700 text-base-50"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={saving} className="btn btn-primary w-full mt-6">
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-base-800 rounded-lg border border-base-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-base-50">Account</h3>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-base-300">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
            </div>

            <button className="btn btn-error w-full">
              Logout
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-base-800 rounded-lg border border-base-700 p-6 mt-6">
            <h3 className="text-xl font-bold mb-4 text-base-50">Quick Links</h3>
            <div className="space-y-2">
              <a href="/orders" className="link link-primary block">
                My Orders
              </a>
              <a href="/cart" className="link link-primary block">
                Shopping Cart
              </a>
              <a href="/shop" className="link link-primary block">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

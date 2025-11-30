'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  review_count: number;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8);

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error?.message || error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    // TODO: Implement add to cart logic with cart context
    alert('Add to cart functionality coming soon');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 rounded-xl overflow-hidden mb-12 border border-base-700">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <img
          src="/hoc_background.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-12">
          <h1 className="text-5xl font-bold text-white mb-4">Luxury Living</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-lg">
            Discover curated premium furniture and decor for your home
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-base-50">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Furniture', 'Lighting', 'Decor', 'Art'].map((category) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group relative h-40 rounded-lg overflow-hidden border border-base-700 hover:border-gold-500 transition"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent group-hover:from-gold-500/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="text-xl font-bold text-base-50 group-hover:text-gold-500 transition">
                  {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-base-50">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        <div className="p-6 bg-base-800 rounded-lg border border-base-700">
          <div className="text-gold-500 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2 text-base-50">Premium Quality</h3>
          <p className="text-base-300">Handpicked luxury items from around the world</p>
        </div>
        <div className="p-6 bg-base-800 rounded-lg border border-base-700">
          <div className="text-gold-500 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2 text-base-50">Fast Shipping</h3>
          <p className="text-base-300">Free delivery on orders over $500</p>
        </div>
        <div className="p-6 bg-base-800 rounded-lg border border-base-700">
          <div className="text-gold-500 text-3xl mb-4">✓</div>
          <h3 className="text-xl font-bold mb-2 text-base-50">Secure Payment</h3>
          <p className="text-base-300">Your payment information is always protected</p>
        </div>
      </section>
    </div>
  );
}

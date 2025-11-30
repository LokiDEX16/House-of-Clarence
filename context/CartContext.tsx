'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  cartCount: number;
  loading: boolean;
  addToCart: (product: Omit<CartProduct, 'quantity'>) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from Supabase when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(
          `
          id,
          quantity,
          products:product_id(id, name, price, image_url)
        `
        )
        .eq('user_id', user.id);

      if (error) throw error;

      // Transform the data to match CartProduct interface
      const cartProducts: CartProduct[] = data?.map((item: any) => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        image_url: item.products.image_url,
        quantity: item.quantity,
      })) || [];

      setCart(cartProducts);
    } catch (error: any) {
      console.error('Error fetching cart:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Omit<CartProduct, 'quantity'>) => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      // Check if product already in cart
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        // Add new item to cart
        const { error } = await supabase.from('cart_items').insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        });

        if (error) throw error;

        // Add to local state
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error?.message || error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      // Remove from local state
      setCart(cart.filter((item) => item.id !== productId));
    } catch (error: any) {
      console.error('Error removing from cart:', error?.message || error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      // Update local state
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      console.error('Error updating quantity:', error?.message || error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setCart([]);
    } catch (error: any) {
      console.error('Error clearing cart:', error?.message || error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

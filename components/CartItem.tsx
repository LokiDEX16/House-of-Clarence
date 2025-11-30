'use client';

import Link from 'next/link';
import { useState } from 'react';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartItemProps {
  product: CartProduct;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  product,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setUpdating(true);
    try {
      await onUpdateQuantity(newQuantity);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (confirm('Remove this item from cart?')) {
      setUpdating(true);
      try {
        await onRemove();
      } finally {
        setUpdating(false);
      }
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-base-800 rounded-lg border border-base-700">
      {/* Image */}
      <div className="w-24 h-24 bg-base-700 rounded-lg overflow-hidden flex-shrink-0">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-base-50 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gold-500 font-bold mb-3">${product.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => handleQuantityChange(Math.max(1, product.quantity - 1))}
            disabled={updating}
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{product.quantity}</span>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => handleQuantityChange(product.quantity + 1)}
            disabled={updating}
          >
            +
          </button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="text-lg font-bold text-base-50">${(product.price * product.quantity).toFixed(2)}</p>
        <button
          className="btn btn-xs btn-error btn-outline"
          onClick={handleRemove}
          disabled={updating}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

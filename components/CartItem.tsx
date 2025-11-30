import Link from 'next/link';

interface CartItemProps {
  id: string;
  product_id?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-base-800 rounded-lg border border-base-700">
      {/* Image */}
      <div className="w-24 h-24 bg-base-700 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <Link href={`/product/${id}`} className="link link-hover">
          <h3 className="font-semibold text-base-50 mb-1">{name}</h3>
        </Link>
        <p className="text-gold-500 font-bold mb-3">${price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="text-lg font-bold text-base-50">${(price * quantity).toFixed(2)}</p>
        <button
          className="btn btn-xs btn-error btn-outline"
          onClick={() => onRemove(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

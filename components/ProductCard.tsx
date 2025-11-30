interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  review_count: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="card bg-base-800 shadow-xl hover:shadow-2xl transition-shadow border border-base-700">
      {/* Image */}
      <figure className="relative h-64 bg-base-700">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 badge badge-primary">New</div>
      </figure>

      {/* Content */}
      <div className="card-body">
        <h2 className="card-title text-base-50 text-lg line-clamp-2">{product.name}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${product.id}`}
                className="mask mask-star-2 bg-gold-500"
                checked={i < Math.floor(product.rating)}
                readOnly
              />
            ))}
          </div>
          <span className="text-xs text-base-400">({product.review_count})</span>
        </div>

        {/* Price */}
        <div className="text-gold-500 font-bold text-xl">${product.price.toFixed(2)}</div>

        {/* Add to Cart Button */}
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary w-full"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

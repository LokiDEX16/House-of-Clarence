/**
 * Cart utilities for managing shopping cart operations
 */

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}

/**
 * Calculate cart subtotal
 */
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Calculate tax (10%)
 */
export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.1;
};

/**
 * Calculate shipping (free over $500)
 */
export const calculateShipping = (subtotal: number): number => {
  return subtotal > 500 ? 0 : 50;
};

/**
 * Calculate total with tax and shipping
 */
export const calculateTotal = (items: CartItem[]): number => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  return subtotal + tax + shipping;
};

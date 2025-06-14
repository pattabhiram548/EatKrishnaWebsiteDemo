import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  variants: { name: string; price: number }[];
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      product: product.name,
      variant: product.variants[selectedVariant],
      quantity
    });
    onClose();
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log('Buy now:', {
      product: product.name,
      variant: product.variants[selectedVariant],
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">EatKrishna</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-sm text-gray-500">Regular price</span>
                <div className="text-2xl font-bold text-orange-600">
                  Rs. {product.variants[selectedVariant].price}.00
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Shipping calculated at checkout.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Quantity</h4>
                <div className="space-y-2">
                  {product.variants.map((variant, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="variant"
                        checked={selectedVariant === index}
                        onChange={() => setSelectedVariant(index)}
                        className="mr-2 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">
                        {variant.name} - Rs. {variant.price}.00
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Quantity</h4>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to cart</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    product.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy it now
                </button>
              </div>

              {!product.inStock && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">
                    This product is currently out of stock.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-3">Product Description</h4>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ProductVariety } from './VarietySelectionModal';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
}

interface ProductModalProps {
  product: Product;
  variety: ProductVariety;
  onClose: () => void;
}

interface SizeOption {
  weight: number;
  label: string;
}

const SIZE_OPTIONS: SizeOption[] = [
  { weight: 800, label: '800g' },
  { weight: 400, label: '400g' },
  { weight: 200, label: '200g' },
];

const ProductModal: React.FC<ProductModalProps> = ({ product, variety, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZE_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const calculatePrice = (size: SizeOption): number => {
    if (size.weight === 800) {
      return variety.priceFor800g;
    } else if (size.weight === 400) {
      return Math.round(variety.priceFor800g * 0.5);
    } else if (size.weight === 200) {
      return Math.round(variety.priceFor800g * 0.25);
    }
    return variety.priceFor800g;
  };

  const currentPrice = calculatePrice(selectedSize);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} - ${variety.name}`,
      variant: `${variety.name} (${selectedSize.label})`,
      price: currentPrice,
      quantity,
      image: variety.image || product.image,
    });
    toast.success('Added to cart!');
    onClose();
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: `${product.name} - ${variety.name}`,
      variant: `${variety.name} (${selectedSize.label})`,
      price: currentPrice,
      quantity,
      image: variety.image || product.image,
    });
    toast.success('Added to cart!');
    onClose();
    navigate('/cart');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <Toaster position="top-right" />
      <div 
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">EatKrishna</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* ===== Product Image (UPDATED) ===== */}
            <div className="flex items-start justify-center">
              {/*
                Make the image container have a fixed responsive height and not shrink.
                The img uses w-full h-full object-cover so it completely fills container.
              */}
              <div className="w-full max-w-lg flex-shrink-0 overflow-hidden rounded-lg shadow-lg
                              h-64 md:h-[380px] lg:h-[520px]">
                <img
                  src={variety.image || product.image}
                  alt={variety.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.name} - {variety.name}
                </h3>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Regular price</span>
                <div className="text-3xl font-bold text-orange-600 mt-1">
                  Rs. {currentPrice}.00
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Shipping calculated at checkout.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Select Size</h4>
                <div className="space-y-2">
                  {SIZE_OPTIONS.map((size) => {
                    const sizePrice = calculatePrice(size);
                    return (
                      <label
                        key={size.weight}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedSize.weight === size.weight
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="size"
                            checked={selectedSize.weight === size.weight}
                            onChange={() => setSelectedSize(size)}
                            className="mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500"
                          />
                          <span className="font-medium text-gray-900">{size.label}</span>
                        </div>
                        <span className="font-semibold text-gray-700">
                          Rs. {sizePrice}.00
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Quantity</h4>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="text-xl font-semibold px-6 py-2 border-2 border-gray-300 rounded-lg min-w-[80px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                    product.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                </button>
              </div>

              {!product.inStock && (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">
                    This product is currently out of stock.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-lg">Product Description</h4>
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

import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from './CartContext';
import toast from 'react-hot-toast';
import {
  INGREDIENTS,
  VARIETIES,
  SIZES,
  MIN_INGREDIENTS,
  MAX_INGREDIENTS,
  Size,
} from '../data/ladduConfig';

interface ChooseYourLadduProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

const ChooseYourLaddu: React.FC<ChooseYourLadduProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedVariety, setSelectedVariety] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setSelectedIngredients([]);
      setSelectedVariety(null);
      setSelectedSize(null);
      setQuantity(1);
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleIngredientToggle = (id: string) => {
    setErrorMessage('');
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== id));
    } else {
      if (selectedIngredients.length >= MAX_INGREDIENTS) {
        setErrorMessage(`Maximum ${MAX_INGREDIENTS} ingredients allowed.`);
        return;
      }
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const handleStep1Next = () => {
    if (selectedIngredients.length < MIN_INGREDIENTS) {
      setErrorMessage(`Please select at least ${MIN_INGREDIENTS} ingredients.`);
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!selectedVariety) {
      setErrorMessage('Please choose one variety type.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    if (!selectedSize) {
      setErrorMessage('Please select a size.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(4);
  };

  const calculatePrice = (): number => {
    if (!selectedVariety || !selectedSize) return 0;
    const variety = VARIETIES.find((v) => v.id === selectedVariety);
    if (!variety) return 0;
    return Math.round(variety.priceFor800g * selectedSize.multiplier * quantity);
  };

  const handleAddToCart = () => {
    if (!selectedVariety || !selectedSize) return;

    const variety = VARIETIES.find((v) => v.id === selectedVariety);
    if (!variety) return;

    const ingredientNames = selectedIngredients
      .map((id) => INGREDIENTS.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    addToCart({
      id: Date.now(),
      name: `Custom ${variety.name} (${selectedIngredients.length}-Combo)`,
      variant: `${selectedSize.label} - ${ingredientNames}`,
      price: calculatePrice(),
      quantity,
      image: '/images/MamraBadamLaddu.png',
    });

    toast.success('Added to cart!');
    onClose();
  };

  const getSelectedIngredientNames = (): string[] => {
    return selectedIngredients
      .map((id) => INGREDIENTS.find((ing) => ing.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const getSelectedVarietyName = (): string => {
    if (!selectedVariety) return '';
    return VARIETIES.find((v) => v.id === selectedVariety)?.name || '';
  };

  if (!isOpen) return null;

  // --- Step 1 ---
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Select Ingredients</h3>
        <p className="text-gray-600">
          Choose {MIN_INGREDIENTS} to {MAX_INGREDIENTS} ingredients for your custom laddu
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Selected: {selectedIngredients.length} / {MAX_INGREDIENTS}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {INGREDIENTS.length ? (
          INGREDIENTS.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <label
                key={ingredient.id}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleIngredientToggle(ingredient.id)}
                  className="sr-only"
                />
                <div className="flex items-center w-full">
                  <div
                    className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                      isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{ingredient.name}</span>
                </div>
              </label>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No ingredients available. Please check the configuration.
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleStep1Next}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // --- Step 2 ---
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Select Variety Type</h3>
        <p className="text-gray-600">Choose one variety type for your custom laddu</p>
      </div>

      <div className="space-y-3">
        {VARIETIES.map((variety) => {
          const isSelected = selectedVariety === variety.id;
          return (
            <label
              key={variety.id}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="variety"
                  checked={isSelected}
                  onChange={() => {
                    setSelectedVariety(variety.id);
                    setErrorMessage('');
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-medium text-gray-900">{variety.name}</span>
              </div>
              <span className="text-sm text-gray-600">Rs. {variety.priceFor800g}/800g</span>
            </label>
          );
        })}
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(1);
            setErrorMessage('');
          }}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleStep2Next}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // --- Step 3 ---
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Select Size</h3>
        <p className="text-gray-600">Choose the size for your custom laddu</p>
      </div>

      <div className="space-y-3">
        {SIZES.map((size) => {
          const isSelected = selectedSize?.weight === size.weight;
          const variety = VARIETIES.find((v) => v.id === selectedVariety);
          const sizePrice = variety ? Math.round(variety.priceFor800g * size.multiplier) : 0;

          return (
            <label
              key={size.weight}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="size"
                  checked={isSelected}
                  onChange={() => {
                    setSelectedSize(size);
                    setErrorMessage('');
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="font-medium text-gray-900">{size.label}</span>
              </div>
              <span className="font-semibold text-gray-700">Rs. {sizePrice}.00</span>
            </label>
          );
        })}
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(2);
            setErrorMessage('');
          }}
          className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleStep3Next}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // --- Step 4 (Summary with Quantity + All Fields) ---
  const renderStep4 = () => {
    const finalPrice = calculatePrice();
    const ingredientNames = getSelectedIngredientNames();
    const varietyName = getSelectedVarietyName();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Summary</h3>
          <p className="text-gray-600">Review your custom laddu details</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Selected Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {ingredientNames.map((name, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Total Ingredients (Combo Count)</p>
              <p className="text-lg font-semibold text-gray-900">{ingredientNames.length}-Combo</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Variety Type</p>
              <p className="text-lg font-semibold text-gray-900">{varietyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Size</p>
              <p className="text-lg font-semibold text-gray-900">{selectedSize?.label}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Final Price</p>
              <p className="text-2xl font-bold text-orange-600">Rs. {finalPrice}.00</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4">
            <p className="text-sm font-medium text-gray-700">Quantity</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border-2 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-100"
              >
                −
              </button>
              <span className="text-lg font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 border-2 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Modal Render ---
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Choose Your Laddu</h2>
            <div className="flex items-center space-x-2 mt-1">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className={`h-1 w-8 ${currentStep > step ? 'bg-orange-600' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default ChooseYourLaddu;

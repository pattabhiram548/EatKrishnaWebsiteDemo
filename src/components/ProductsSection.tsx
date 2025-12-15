import React, { useState } from 'react';
import { Card } from '@mui/material';
import { Search, Filter, Eye, Sparkles } from 'lucide-react';
import ProductModal from './ProductModal';
import VarietySelectionModal, { ProductVariety } from './VarietySelectionModal';
import ChooseYourLaddu from './ChooseYourLaddu';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
}

const ProductsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showVarietyModal, setShowVarietyModal] = useState(false);
  const [productForVariety, setProductForVariety] = useState<Product | null>(null);
  const [selectedVariety, setSelectedVariety] = useState<ProductVariety | null>(null);
  const [showChooseYourLaddu, setShowChooseYourLaddu] = useState(false);

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Mamra Badam + Pista + Walnut +Cashew + 8 Seeds",
      image: "/images/mamrabadamseed.jpg",
      category: "Laddu",
      inStock: true,
      description: "Premium almond laddus made with finest almonds and traditional recipes",
    },
    {
      id: 2,
      name: "Mamra Badam + Pista + Walnut +Cashew",
      image: "https://i.ytimg.com/vi/4j1GsmBzg1g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC6Gw8GyBT-_Fp5S0-wN-P_BAl7wQ",
      category: "Laddu",
      inStock: true,
      description: "Rich and creamy cashew laddus with authentic taste",
    },
    {
      id: 3,
      name: "Mamra Badam + Pista + Walnut",
      image: "/images/maramabadampista.jpg",
      category: "Laddu",
      inStock: true,
      description: "Mixed dry fruits laddu packed with nutrition and flavor",
    },
    {
      id: 4,
      name: "Mamra Badam + Pista + Cashew",
      image: "/images/MamraBadamPistaCashewLaddu.webp",
      category: "Laddu",
      inStock: true,
      description: "Healthy flax seeds laddu rich in omega-3 fatty acids",
    },
    {
      id: 5,
      name: "Mamra Badam + Walnut + Cashew",
      image: "images/MamraBadamWalnutCashewLaddu.jpg",
      category: "Laddu",
      inStock: true,
      description: "Traditional gondh laddu perfect for winter season",
    },
    {
      id: 6,
      name: "Pista + Walnut + Cashew",
      image: "/images/pistawalnutsladdu.jpg",
      category: "Snacks",
      inStock: true,
      description: "Crispy jowar-based traditional snack",
    },
    {
      id: 7,
      name: "8 Seeds",
      image: "/images/8 Seedsladdu.jpg",
      category: "Snacks",
      inStock: true,
      description: "Spiral-shaped jowar snacks with authentic taste",
    },
    {
      id: 8,
      name: "7 Seeds",
      image: "//www.laddupallem.com/cdn/shop/files/IMG_20250426_214911.jpg?v=1746107903&width=3840",
      category: "Laddu",
      inStock: true,
      description: "Nutritious jowar laddu with natural sweetness",
    },
    {
      id: 9,
      name: "6 Seeds",
      image: "/images/6seedsladdu.jpg",
      category: "Snacks",
      inStock: true,
      description: "Foxtail millet based crunchy snacks",
    },
    {
      id: 10,
      name: "5 Seeds",
      image: "/images/5seedsladdu.webp",
      category: "Laddu",
      inStock: true,
      description: "Finger millet laddu rich in calcium and iron",
    },
    {
      id: 11,
      name: "4 Seeds",
      image: "/images/4seedsladdu.webp",
      category: "Laddu",
      inStock: true,
      description: "Blend of multiple grains for complete nutrition",
    },
    {
      id: 12,
      name: "3 Seeds",
      image: "/images/3seedsladdu.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 13,
      name: "2 Seeds",
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 14,
      name: "Mamra Badam + Pista + Walnut +Cashew  + 3 Seeds",
      image: "/images/badam and cashewladdu.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 15,
      name: "Mamra Badam + Pista + Walnut + 3 Seeds",
      image: "/images/badam and seedsladdu.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 16,
      name: "Mamra Badam + Pista + Cashew + 3 Seeds",
      image: "images/badam and cashew pista laddu.png",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 17,
      name: "Mamra Badam + Walnut + Cashew + 3 Seeds",
      image: "/images/cashew and walnuts laddu.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    },
    {
      id: 18,
      name: "Pista + Walnut + Cashew + 3 Seeds",
      image: "/images/pitsa and walnuts laddu.webp",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
    }
  ];


  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'inStock' && product.inStock) ||
      (stockFilter === 'outOfStock' && !product.inStock);

    return matchesSearch && matchesStock;
  });

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Protein or Nutritious Bars / Laddus Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our authentic range of millet-based laddus and traditional snacks.
          </p>
        </div>

        {/* Choose Your Laddu Button */}
        <div className="mb-8 text-center">
        <button
  onClick={() => setShowChooseYourLaddu(true)}
  className="inline-flex items-center justify-center space-x-4 w-[420px] bg-gradient-to-r from-orange-600 to-orange-500 text-white py-6 rounded-xl font-extrabold text-2xl hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
>
  <Sparkles className="h-7 w-7" />
  <span>Choose Your Laddu</span>
</button>

        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            <div className="text-sm text-gray-600 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredProducts.length} products found
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        {/* Products Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {displayedProducts.map((product) => (
    <div
      key={product.id}
      className="
        group 
        bg-white 
        rounded-2xl 
        shadow-md 
        overflow-hidden 
        border-2 
        animate-[multicolor-border_4s_linear_infinite] 
        transition-all 
        duration-300 
        hover:shadow-2xl 
        hover:-translate-y-2
        flex 
        flex-col
      "
    >

      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="mt-auto flex space-x-2 pt-2">
          <button
            onClick={() => {
              setProductForVariety(product);
              setShowVarietyModal(true);
            }}
            className={`
              flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200
              ${
                product.inStock
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
            disabled={!product.inStock}
          >
            Start Order
          </button>

          <button
            onClick={() => {
              setProductForVariety(product);
              setShowVarietyModal(true);
            }}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            aria-label="View product"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>
      </div>

    </div>
  ))}
</div>


        {/* View All Button */}
        {!showAll && filteredProducts.length > 8 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              View All Products ({filteredProducts.length - 8} more)
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition"
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Variety Selection Modal */}
      {showVarietyModal && productForVariety && (
        <VarietySelectionModal
          productName={productForVariety.name}
          productImage={productForVariety.image}
          onSelectVariety={(variety) => {
            setSelectedVariety(variety);
            setShowVarietyModal(false);
            setSelectedProduct(productForVariety);
          }}
          onClose={() => {
            setShowVarietyModal(false);
            setProductForVariety(null);
          }}
        />
      )}

      {/* Product Modal */}
      {selectedProduct && selectedVariety && (
        <ProductModal
          product={selectedProduct}
          variety={selectedVariety}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedVariety(null);
            setProductForVariety(null);
          }}
        />
      )}

      {/* Choose Your Laddu Modal */}
      <ChooseYourLaddu
        isOpen={showChooseYourLaddu}
        onClose={() => setShowChooseYourLaddu(false)}
      />
    </section>
  );
};

export default ProductsSection;

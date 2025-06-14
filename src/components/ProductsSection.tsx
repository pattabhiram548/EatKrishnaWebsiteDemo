import React, { useState } from 'react';
import { Card } from '@mui/material';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';
import ProductModal from './ProductModal';

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

const ProductsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Almond Laddu",
      price: 350,
      image: "//www.laddupallem.com/cdn/shop/files/IMG_20250426_214911.jpg?v=1746107903&width=3840",
      category: "Laddu",
      inStock: true,
      description: "Premium almond laddus made with finest almonds and traditional recipes",
      variants: [
        { name: "8pc (350 gms)", price: 350 },
        { name: "15pc (650 gms)", price: 650 }
      ]
    },
    {
      id: 2,
      name: "Cashew Laddu",
      price: 350,
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Laddu",
      inStock: true,
      description: "Rich and creamy cashew laddus with authentic taste",
      variants: [
        { name: "8pc (350 gms)", price: 350 },
        { name: "15pc (650 gms)", price: 650 }
      ]
    },
    {
      id: 3,
      name: "Dry Fruits Laddu",
      price: 400,
      image: "https://img.freepik.com/free-photo/close-up-sweets-handmade-handmade-sweets-from-nuts-dried-fruits-honey-dark-wooden-table-horizontal_176474-2460.jpg?uid=R200780367&ga=GA1.1.1641956993.1747636449&semt=ais_items_boosted&w=740",
      category: "Laddu",
      inStock: true,
      description: "Mixed dry fruits laddu packed with nutrition and flavor",
      variants: [
        { name: "8pc (350 gms)", price: 400 },
        { name: "15pc (650 gms)", price: 720 }
      ]
    },
    {
      id: 4,
      name: "Flax Seeds Laddu",
      price: 340,
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Laddu",
      inStock: false,
      description: "Healthy flax seeds laddu rich in omega-3 fatty acids",
      variants: [
        { name: "8pc (350 gms)", price: 340 },
        { name: "15pc (650 gms)", price: 620 }
      ]
    },
    {
      id: 5,
      name: "Gondh Laddu",
      price: 400,
      image: "//www.laddupallem.com/cdn/shop/files/IMG_20250426_214911.jpg?v=1746107903&width=3840",
      category: "Laddu",
      inStock: true,
      description: "Traditional gondh laddu perfect for winter season",
      variants: [
        { name: "8pc (350 gms)", price: 400 },
        { name: "15pc (650 gms)", price: 720 }
      ]
    },
    {
      id: 6,
      name: "Jonna Janthikalu",
      price: 290,
      image: "data:image/jpeg;base64,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",
      category: "Snacks",
      inStock: true,
      description: "Crispy jowar-based traditional snack",
      variants: [
        { name: "250 gms", price: 290 },
        { name: "500 gms", price: 550 }
      ]
    },
    {
      id: 7,
      name: "Jonna Murukulu",
      price: 290,
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Snacks",
      inStock: true,
      description: "Spiral-shaped jowar snacks with authentic taste",
      variants: [
        { name: "250 gms", price: 290 },
        { name: "500 gms", price: 550 }
      ]
    },
    {
      id: 8,
      name: "Jowar Laddu",
      price: 290,
      image: "//www.laddupallem.com/cdn/shop/files/IMG_20250426_214911.jpg?v=1746107903&width=3840",
      category: "Laddu",
      inStock: true,
      description: "Nutritious jowar laddu with natural sweetness",
      variants: [
        { name: "8pc (350 gms)", price: 290 },
        { name: "15pc (650 gms)", price: 520 }
      ]
    },
    {
      id: 9,
      name: "Korra Janthikalu",
      price: 290,
      image: "data:image/jpeg;base64,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",
      category: "Snacks",
      inStock: false,
      description: "Foxtail millet based crunchy snacks",
      variants: [
        { name: "250 gms", price: 290 },
        { name: "500 gms", price: 550 }
      ]
    },
    {
      id: 10,
      name: "Raagi Laddu",
      price: 260,
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Laddu",
      inStock: true,
      description: "Finger millet laddu rich in calcium and iron",
      variants: [
        { name: "8pc (350 gms)", price: 260 },
        { name: "15pc (650 gms)", price: 480 }
      ]
    },
    {
      id: 11,
      name: "Multi Grain Laddu",
      price: 350,
      image: "//www.laddupallem.com/cdn/shop/files/IMG_20250426_214911.jpg?v=1746107903&width=3840",
      category: "Laddu",
      inStock: true,
      description: "Blend of multiple grains for complete nutrition",
      variants: [
        { name: "8pc (350 gms)", price: 350 },
        { name: "15pc (650 gms)", price: 650 }
      ]
    },
    {
      id: 12,
      name: "Oats Laddu",
      price: 260,
      image: "https://biteskart.com/wp-content/uploads/2022/02/Bajra-Dry-Fruits-LAdoo.jpg",
      category: "Laddu",
      inStock: true,
      description: "Healthy oats laddu for fitness enthusiasts",
      variants: [
        { name: "8pc (350 gms)", price: 260 },
        { name: "15pc (650 gms)", price: 480 }
      ]
    }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock = stockFilter === 'all' || 
      (stockFilter === 'inStock' && product.inStock) || 
      (stockFilter === 'outOfStock' && !product.inStock);
    const matchesPrice = (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
      (!priceRange.max || product.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesStock && matchesPrice;
  });

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <section id="millets-food" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Millet Food Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our authentic range of millet-based laddus and traditional snacks, 
            crafted with premium ingredients and time-honored recipes.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {filteredProducts.length} products found
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Regular price</span>
                    <div className="text-xl font-bold text-orange-600">
                      From Rs. {product.price}.00
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                      product.inStock
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    Choose Options
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        {!showAll && filteredProducts.length > 8 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
            >
              View All Products ({filteredProducts.length - 8} more)
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(false)}
              className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors duration-200"
            >
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default ProductsSection;
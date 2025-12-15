import React from "react";
import { X, Candy, Beef, CupSoda, CakeSlice, Croissant } from "lucide-react";

export interface ProductVariety {
  id: string;
  name: string;
  image: string;
  priceFor800g: number;
  description: string;
  icon: React.ReactNode;
}

interface VarietySelectionModalProps {
  productName: string;
  productImage: string;
  onSelectVariety: (variety: ProductVariety) => void;
  onClose: () => void;
}

const VARIETIES: ProductVariety[] = [
  {
    id: "protein-laddu",
    name: "Protein Laddu",
    image:
      "https://i.ytimg.com/vi/vc4DSbPXyX4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA_M2gpm_m1iFBo8vuZMATy4fKcXQ",
    priceFor800g: 1600,
    description: "A high-protein energy laddu made with nuts & seeds.",
    icon: <Candy className="h-5 w-5 text-orange-500" />,
  },
  {
    id: "nutrition-bar",
    name: "Nutrition Bar",
    image:
      "https://www.powerhungry.com/wp-content/uploads/2015/05/powerhungry_com_jpg-3.jpg",
    priceFor800g: 1800,
    description: "Healthy, filling protein bar for anytime snacking.",
    icon: <Beef className="h-5 w-5 text-purple-600" />,
  },
  {
    id: "protein-bite",
    name: "Protein Bite",
    image: "https://dpfoods.in/wp-content/uploads/2025/01/15-1.png",
    priceFor800g: 1800,
    description: "Mini protein bites packed with flavor & energy.",
    icon: <CakeSlice className="h-5 w-5 text-green-600" />,
  },
  {
    id: "protein-chocolate-bite",
    name: "Protein Chocolate Bite",
    image:
      "images/proteinchocolatebite.jpg",
    priceFor800g: 2000,
    description: "Rich chocolate bites with added protein blend.",
    icon: <Croissant className="h-5 w-5 text-brown-600" />,
  },
  {
    id: "protein-mix",
    name: "Protein Mix",
    image:
      "https://storeassets.im-cdn.com/media-manager/pallavisfoodstudio/nkjao1bRWKroFN1zSQzC_c722101d-3858-4697-a45d-2abb330a3ad6_0x0_webp.jpg",
    priceFor800g: 1400,
    description: "A perfect mix of multi-protein ingredients.",
    icon: <CupSoda className="h-5 w-5 text-blue-500" />,
  },
];

const VarietySelectionModal: React.FC<VarietySelectionModalProps> = ({
  productName,
  onSelectVariety,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Select Product Variety
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {productName}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Choose a variety to continue
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VARIETIES.map((variety) => (
              <button
              key={variety.id}
              onClick={() => onSelectVariety(variety)}
              className="
                group relative rounded-xl p-[2px] 
                bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 
                shadow-md
                hover:shadow-orange-400/40
                transition-all duration-300
              "
            >
              <div
                className="
                  bg-white rounded-xl p-4 
                  flex flex-col text-center
                  hover:bg-white/90 
                  transition-all duration-300
                "
              >
                {/* Image (compact) */}
                <div
                  className="
                    w-full h-40 overflow-hidden rounded-lg bg-gray-100 
                    shadow-inner transform group-hover:-translate-y-1 
                    transition-all duration-300
                  "
                >
                  <img
                    src={variety.image}
                    alt={variety.name}
                    className="
                      w-full h-full object-cover 
                      group-hover:scale-110 
                      transition-transform duration-500
                    "
                  />
                </div>
            
                {/* Icon + Name */}
                <div className="mt-3 flex items-center gap-2 justify-center">
                  {variety.icon}
                  <h4 className="font-semibold text-gray-900 text-base">
                    {variety.name}
                  </h4>
                </div>
            
                {/* Description */}
                <p className="text-sm text-gray-500 mt-1 leading-tight">
                  {variety.description}
                </p>
              </div>
            </button>
            
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VarietySelectionModal;

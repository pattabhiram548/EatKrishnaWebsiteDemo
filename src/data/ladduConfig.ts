export interface Ingredient {
  id: string;
  name: string;
}

export interface Variety {
  id: string;
  name: string;
  priceFor800g: number;
}

export interface Size {
  weight: number;
  label: string;
  multiplier: number; // Multiplier for price calculation (800g = 1.0, 400g = 0.5, 200g = 0.25)
}

export const INGREDIENTS: Ingredient[] = [
  { id: 'pista', name: 'Pista' },
  { id: 'mamra-badam', name: 'Mamra Badam' },
  { id: 'cashew', name: 'Cashew' },
  { id: 'walnuts', name: 'Walnuts' },
  { id: 'pumpkin-seeds', name: 'Pumpkin Seeds' },
  { id: 'watermelon-seeds', name: 'Watermelon Seeds' },
  { id: 'sunflower-seeds', name: 'Sunflower Seeds' },
  { id: 'chia-seeds', name: 'Chia Seeds' },
  { id: 'flax-seeds', name: 'Flax Seeds' },
  { id: 'quinoa', name: 'Quinoa' },
  { id: 'muskmelon-seeds', name: 'Muskmelon Seeds' },
  { id: 'sesame-seeds', name: 'Sesame Seeds' },
];

export const VARIETIES: Variety[] = [
  { id: 'protein-laddu', name: 'Protein Laddu', priceFor800g: 1800 },
  { id: 'nutrition-bar', name: 'Nutrition Bar', priceFor800g: 2000 },
  { id: 'protein-bite', name: 'Protein Bite', priceFor800g: 2000 },
  { id: 'protein-chocolate-bite', name: 'Protein Chocolate Bite', priceFor800g: 2200 },
  { id: 'protein-mix', name: 'Protein Mix', priceFor800g: 1600 },
];

export const SIZES: Size[] = [
  { weight: 800, label: '800g', multiplier: 1.0 },
  { weight: 400, label: '400g', multiplier: 0.5 },
  { weight: 200, label: '200g', multiplier: 0.25 },
];

export const MIN_INGREDIENTS = 3;
export const MAX_INGREDIENTS = 11;


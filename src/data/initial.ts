import { MenuItem, Ingredient, Supplier } from '../types';

export const generateMenuData = (): MenuItem[] => [
  {
    id: 'idli-sambar',
    name: 'Idli Sambar',
    price: 60,
    description: '2 idlis, sambar, and coconut chutney',
    ingredients: {
      'idli-batter': 200, // grams
      'sambar': 150, // ml
      'coconut-chutney': 50, // grams
    },
    preparationTime: 120, // seconds
  },
  {
    id: 'medu-vada',
    name: 'Medu Vada Sambar',
    price: 70,
    description: '2 medu vadas, sambar, and coconut chutney',
    ingredients: {
      'vada-batter': 180, // grams
      'sambar': 150, // ml
      'coconut-chutney': 50, // grams
    },
    preparationTime: 120,
  },
  {
    id: 'dosa',
    name: 'Dosa',
    price: 80,
    description: '1 dosa with potato masala, sambar, and coconut chutney',
    ingredients: {
      'dosa-batter': 200, // grams
      'potato-masala': 100, // grams
      'sambar': 150, // ml
      'coconut-chutney': 50, // grams
    },
    preparationTime: 120,
  },
  {
    id: 'masala-tea',
    name: 'Masala Tea',
    price: 30,
    description: '1 cup',
    ingredients: {
      'tea-leaves': 3, // grams
      'milk': 100, // ml
      'masala-mix': 2, // grams
    },
    preparationTime: 120,
  },
  {
    id: 'filter-coffee',
    name: 'Filter Coffee',
    price: 40,
    description: '1 cup',
    ingredients: {
      'coffee-powder': 20, // grams
      'milk': 200, // ml
    },
    preparationTime: 120,
  },
];

export const generateIngredientData = (): Ingredient[] => [
  {
    id: 'idli-batter',
    name: 'Idli Batter',
    quantity: 10000,
    unit: 'grams',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    batchNumber: 'IB001',
    reorderThreshold: 2000,
    quality: 98,
    supplierPrice: 50,
  },
  {
    id: 'vada-batter',
    name: 'Vada Batter',
    quantity: 8000,
    unit: 'grams',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    batchNumber: 'VB001',
    reorderThreshold: 1500,
    quality: 95,
    supplierPrice: 60,
  },
  // Add more ingredients...
];

export const generateSupplierData = (): Supplier[] => [
  {
    id: 'sup1',
    name: 'South Indian Essentials',
    rating: 4.8,
    ingredients: ['idli-batter', 'vada-batter', 'dosa-batter'],
  },
  {
    id: 'sup2',
    name: 'Fresh Daily Supplies',
    rating: 4.5,
    ingredients: ['coconut', 'vegetables', 'milk'],
  },
  {
    id: 'sup3',
    name: 'Beverage Specialists',
    rating: 4.7,
    ingredients: ['coffee-powder', 'tea-leaves', 'masala-mix'],
  },
];
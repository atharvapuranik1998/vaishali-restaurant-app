import { create } from 'zustand';
import { MenuItem, Ingredient, Order, Table, Supplier } from '../types';
import { generateMenuData, generateIngredientData, generateSupplierData } from '../data/initial';

interface StoreState {
  menu: MenuItem[];
  inventory: Ingredient[];
  orders: Order[];
  tables: Table[];
  suppliers: Supplier[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateInventory: (ingredientId: string, quantity: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  menu: generateMenuData(),
  inventory: generateIngredientData(),
  orders: [],
  tables: Array.from({ length: 11 }, (_, i) => ({
    number: i + 1,
    status: 'available'
  })),
  suppliers: generateSupplierData(),
  activeTab: 'home',
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order],
    tables: state.tables.map((table) =>
      table.number === order.tableNumber
        ? { ...table, status: 'occupied', currentOrder: order }
        : table
    ),
  })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    ),
    tables: status === 'completed'
      ? state.tables.map((table) =>
          table.currentOrder?.id === orderId
            ? { ...table, status: 'available', currentOrder: undefined }
            : table
        )
      : state.tables
  })),
  
  updateInventory: (ingredientId, quantity) => set((state) => ({
    inventory: state.inventory.map((ingredient) =>
      ingredient.id === ingredientId
        ? { ...ingredient, quantity: ingredient.quantity + quantity }
        : ingredient
    ),
  })),
}));
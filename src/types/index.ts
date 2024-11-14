export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: Record<string, number>;
  preparationTime: number;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  batchNumber: string;
  reorderThreshold: number;
  quality: number;
  supplierPrice: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: Array<{
    menuItem: MenuItem;
    quantity: number;
  }>;
  status: 'pending' | 'preparing' | 'completed';
  createdAt: Date;
  completionTime?: Date;
}

export interface Table {
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrder?: Order;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  ingredients: string[];
}
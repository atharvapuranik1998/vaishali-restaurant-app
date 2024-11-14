import React from 'react';
import { useStore } from '../../store';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuSelectionProps {
  selectedItems: Array<{ menuItem: MenuItem; quantity: number }>;
  onUpdateSelection: (items: Array<{ menuItem: MenuItem; quantity: number }>) => void;
}

export const MenuSelection = ({ selectedItems, onUpdateSelection }: MenuSelectionProps) => {
  const menu = useStore((state) => state.menu);

  const updateItemQuantity = (menuItem: MenuItem, quantity: number) => {
    const existingItem = selectedItems.find(item => item.menuItem.id === menuItem.id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= 0) {
        onUpdateSelection(selectedItems.filter(item => item.menuItem.id !== menuItem.id));
      } else {
        onUpdateSelection(
          selectedItems.map(item =>
            item.menuItem.id === menuItem.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } else if (quantity > 0) {
      onUpdateSelection([...selectedItems, { menuItem, quantity }]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Menu Items</h3>
      <div className="grid gap-4">
        {menu.map((item) => {
          const selectedItem = selectedItems.find(selected => selected.menuItem.id === item.id);
          const quantity = selectedItem?.quantity || 0;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
            >
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-sm font-medium text-orange-600">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateItemQuantity(item, -1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  disabled={quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item, 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
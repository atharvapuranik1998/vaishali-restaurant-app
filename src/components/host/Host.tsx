import React, { useState } from 'react';
import { useStore } from '../../store';
import { TableGrid } from './TableGrid';
import { MenuSelection } from './MenuSelection';
import { OrderSummary } from './OrderSummary';
import { MenuItem } from '../../types';

export const Host = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Array<{ menuItem: MenuItem; quantity: number }>>([]);
  const addOrder = useStore((state) => state.addOrder);

  const handlePlaceOrder = () => {
    if (selectedTable && selectedItems.length > 0) {
      const orderId = Math.random().toString(36).substr(2, 9);
      addOrder({
        id: orderId,
        tableNumber: selectedTable,
        items: selectedItems,
        status: 'pending',
        createdAt: new Date(),
      });
      setSelectedTable(null);
      setSelectedItems([]);
    }
  };

  if (!selectedTable) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Select a Table</h2>
        <TableGrid onSelectTable={setSelectedTable} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <MenuSelection
        selectedItems={selectedItems}
        onUpdateSelection={setSelectedItems}
      />
      <div className="space-y-6">
        <OrderSummary
          tableNumber={selectedTable}
          selectedItems={selectedItems}
          onPlaceOrder={handlePlaceOrder}
        />
        <button
          onClick={() => {
            setSelectedTable(null);
            setSelectedItems([]);
          }}
          className="btn btn-secondary w-full"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};
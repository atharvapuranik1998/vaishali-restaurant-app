import React from 'react';
import { MenuItem } from '../../types';

interface OrderSummaryProps {
  tableNumber: number;
  selectedItems: Array<{ menuItem: MenuItem; quantity: number }>;
  onPlaceOrder: () => void;
}

export const OrderSummary = ({ tableNumber, selectedItems, onPlaceOrder }: OrderSummaryProps) => {
  const total = selectedItems.reduce(
    (sum, { menuItem, quantity }) => sum + menuItem.price * quantity,
    0
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Order Summary - Table {tableNumber}</h3>
      <div className="space-y-3">
        {selectedItems.map(({ menuItem, quantity }) => (
          <div key={menuItem.id} className="flex justify-between">
            <span>
              {quantity}x {menuItem.name}
            </span>
            <span className="font-medium">₹{menuItem.price * quantity}</span>
          </div>
        ))}
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onPlaceOrder}
        disabled={selectedItems.length === 0}
        className="btn btn-primary w-full"
      >
        Place Order
      </button>
    </div>
  );
};
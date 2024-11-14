import React from 'react';
import { useStore } from '../../store';
import { TrendingUp } from 'lucide-react';

export const PopularItems = () => {
  const menu = useStore((state) => state.menu);
  
  // In a real app, this would be calculated from actual order data
  const popularItems = menu.slice(0, 3);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
      <div className="space-y-3">
        {popularItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium">{item.name}</span>
              <p className="text-sm text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">High Demand</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
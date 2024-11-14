import React from 'react';
import { useStore } from '../../store';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const OrderQueue = () => {
  const orders = useStore((state) => 
    state.orders.filter(order => order.status !== 'completed').slice(0, 4)
  );

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Order Queue</h3>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div>
              <span className="font-medium">#{order.id}</span>
              <p className="text-sm text-gray-600">
                Table {order.tableNumber} • {order.items.length} items
              </p>
            </div>
            <div className="flex items-center text-orange-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {formatDistanceToNow(order.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-gray-500 text-center py-4">No orders in queue</p>
        )}
      </div>
    </div>
  );
};
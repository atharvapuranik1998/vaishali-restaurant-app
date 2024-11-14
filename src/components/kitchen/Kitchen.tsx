import React from 'react';
import { useStore } from '../../store';
import { OrderCard } from './OrderCard';
import { ChefHat } from 'lucide-react';

export const Kitchen = () => {
  const orders = useStore((state) => 
    state.orders.filter(order => order.status === 'pending' || order.status === 'preparing')
  );
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  const preparingOrders = orders.filter(order => order.status === 'preparing');
  const pendingOrders = orders.filter(order => order.status === 'pending');

  const handleStartPreparing = (orderId: string) => {
    updateOrderStatus(orderId, 'preparing');
  };

  const handleComplete = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
  };

  return (
    <div className="space-y-8">
      {/* Currently Preparing */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-800">Currently Preparing</h2>
        </div>
        {preparingOrders.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {preparingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onComplete={() => handleComplete(order.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-8 text-gray-500">
            No orders being prepared
          </div>
        )}
      </section>

      {/* Order Queue */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Queue</h2>
        {pendingOrders.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {pendingOrders.map((order) => (
              <div key={order.id} className="card">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Table {order.tableNumber} • {order.items.length} items
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map(({ menuItem, quantity }) => (
                    <div key={menuItem.id} className="text-sm">
                      {quantity}x {menuItem.name}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleStartPreparing(order.id)}
                  className="btn btn-primary w-full"
                >
                  Start Preparing
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-8 text-gray-500">
            No orders in queue
          </div>
        )}
      </section>
    </div>
  );
};
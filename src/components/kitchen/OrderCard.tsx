import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { Clock, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OrderCardProps {
  order: Order;
  onComplete: () => void;
}

export const OrderCard = ({ order, onComplete }: OrderCardProps) => {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">
            Table {order.tableNumber} • {formatDistanceToNow(order.createdAt, { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center text-orange-600">
          <Clock className="w-5 h-5 mr-1" />
          <span className="font-medium">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map(({ menuItem, quantity }) => (
          <div key={menuItem.id} className="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
            <div>
              <span className="font-medium">{quantity}x {menuItem.name}</span>
              <p className="text-sm text-gray-600">{menuItem.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        disabled={timeLeft > 0}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        {timeLeft > 0 ? 'Preparing...' : 'Mark as Complete'}
      </button>
    </div>
  );
};
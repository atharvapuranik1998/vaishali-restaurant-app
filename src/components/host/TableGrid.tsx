import React from 'react';
import { useStore } from '../../store';
import { Users, Clock } from 'lucide-react';

export const TableGrid = ({ onSelectTable }: { onSelectTable: (tableNumber: number) => void }) => {
  const tables = useStore((state) => state.tables);

  return (
    <div className="grid grid-cols-4 gap-4">
      {tables.map((table) => (
        <button
          key={table.number}
          onClick={() => table.status === 'available' && onSelectTable(table.number)}
          className={`p-4 rounded-lg text-left transition-all ${
            table.status === 'available'
              ? 'bg-white shadow-sm hover:shadow-md cursor-pointer'
              : 'bg-gray-100 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Table {table.number}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              table.status === 'available'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {table.status}
            </span>
          </div>
          {table.currentOrder && (
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{table.currentOrder.items.length} items</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Order #{table.currentOrder.id}</span>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
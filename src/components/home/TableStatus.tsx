import React from 'react';
import { useStore } from '../../store';

export const TableStatus = () => {
  const tables = useStore((state) => state.tables);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Table Status</h3>
      <div className="grid grid-cols-4 gap-3">
        {tables.map((table) => (
          <div
            key={table.number}
            className={`p-3 rounded-lg text-center ${
              table.status === 'available'
                ? 'bg-green-100 text-green-800'
                : table.status === 'occupied'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            <div className="font-medium">Table {table.number}</div>
            <div className="text-sm capitalize">{table.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
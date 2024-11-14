import React from 'react';
import { useStore } from '../../store';
import { AlertTriangle, TrendingDown, Gauge } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface InventoryTableProps {
  filter: string;
}

export const InventoryTable = ({ filter }: InventoryTableProps) => {
  const inventory = useStore((state) => state.inventory);

  const filteredInventory = inventory.filter((item) => {
    switch (filter) {
      case 'low':
        return item.quantity <= item.reorderThreshold;
      case 'expiring':
        return (
          new Date(item.expiryDate).getTime() - new Date().getTime() <=
          3 * 24 * 60 * 60 * 1000
        );
      case 'quality':
        return item.quality < 90;
      default:
        return true;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quality
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInventory.map((item) => {
            const stockPercentage = (item.quantity / item.reorderThreshold) * 100;
            const daysToExpiry = Math.ceil(
              (new Date(item.expiryDate).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Batch: {item.batchNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          stockPercentage > 50
                            ? 'bg-green-500'
                            : stockPercentage > 20
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDistanceToNow(new Date(item.expiryDate), {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {daysToExpiry} days left
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-1 text-gray-400" />
                    <span
                      className={`text-sm font-medium ${
                        item.quality >= 90
                          ? 'text-green-600'
                          : item.quality >= 70
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {item.quality}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.quantity <= item.reorderThreshold && (
                    <div className="flex items-center text-yellow-600 mb-1">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span className="text-sm">Low Stock</span>
                    </div>
                  )}
                  {daysToExpiry <= 3 && (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Expiring Soon</span>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filteredInventory.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items match the current filter
        </div>
      )}
    </div>
  );
};
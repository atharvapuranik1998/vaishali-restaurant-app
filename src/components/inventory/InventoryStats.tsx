import React from 'react';
import { useStore } from '../../store';
import { Package, AlertTriangle, Gauge, Clock } from 'lucide-react';

export const InventoryStats = () => {
  const inventory = useStore((state) => state.inventory);

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter((item) => item.quantity <= item.reorderThreshold).length,
    expiringItems: inventory.filter(
      (item) =>
        new Date(item.expiryDate).getTime() - new Date().getTime() <=
        3 * 24 * 60 * 60 * 1000
    ).length,
    qualityIssues: inventory.filter((item) => item.quality < 90).length,
  };

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="card flex items-center">
        <Package className="w-10 h-10 text-orange-600 mr-4" />
        <div>
          <div className="text-sm text-gray-600">Total Items</div>
          <div className="text-2xl font-bold">{stats.totalItems}</div>
        </div>
      </div>
      <div className="card flex items-center">
        <AlertTriangle className="w-10 h-10 text-yellow-600 mr-4" />
        <div>
          <div className="text-sm text-gray-600">Low Stock</div>
          <div className="text-2xl font-bold">{stats.lowStock}</div>
        </div>
      </div>
      <div className="card flex items-center">
        <Clock className="w-10 h-10 text-red-600 mr-4" />
        <div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
          <div className="text-2xl font-bold">{stats.expiringItems}</div>
        </div>
      </div>
      <div className="card flex items-center">
        <Gauge className="w-10 h-10 text-purple-600 mr-4" />
        <div>
          <div className="text-sm text-gray-600">Quality Issues</div>
          <div className="text-2xl font-bold">{stats.qualityIssues}</div>
        </div>
      </div>
    </div>
  );
};
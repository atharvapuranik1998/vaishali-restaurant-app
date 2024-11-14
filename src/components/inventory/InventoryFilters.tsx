import React from 'react';
import { Filter } from 'lucide-react';

interface InventoryFiltersProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export const InventoryFilters = ({ onFilterChange, currentFilter }: InventoryFiltersProps) => {
  const filters = [
    { id: 'all', label: 'All Items' },
    { id: 'low', label: 'Low Stock' },
    { id: 'expiring', label: 'Expiring Soon' },
    { id: 'quality', label: 'Quality Issues' },
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <Filter className="w-5 h-5 text-gray-600" />
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === filter.id
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
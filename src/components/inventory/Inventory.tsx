import React, { useState } from 'react';
import { InventoryStats } from './InventoryStats';
import { InventoryFilters } from './InventoryFilters';
import { InventoryTable } from './InventoryTable';

export const Inventory = () => {
  const [currentFilter, setCurrentFilter] = useState('all');

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>
      <InventoryStats />
      <InventoryFilters
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <div className="card">
        <InventoryTable filter={currentFilter} />
      </div>
    </div>
  );
};
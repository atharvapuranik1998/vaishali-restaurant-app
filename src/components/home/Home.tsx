import React from 'react';
import { OrderQueue } from './OrderQueue';
import { TableStatus } from './TableStatus';
import { PopularItems } from './PopularItems';
import { DailySales } from './DailySales';

export const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <OrderQueue />
      <TableStatus />
      <PopularItems />
      <DailySales />
    </div>
  );
};
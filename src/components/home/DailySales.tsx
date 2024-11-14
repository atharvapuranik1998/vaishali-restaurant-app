import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '6AM', sales: 1200 },
  { time: '9AM', sales: 2100 },
  { time: '12PM', sales: 3200 },
  { time: '3PM', sales: 2800 },
  { time: '6PM', sales: 3900 },
  { time: '9PM', sales: 3100 },
];

export const DailySales = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Daily Sales</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
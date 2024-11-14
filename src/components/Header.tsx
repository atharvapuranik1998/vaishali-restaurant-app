import React from 'react';
import { useStore } from '../store';
import { Coffee } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'host', label: 'Host' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'forecast', label: 'AI Forecast' },
  { id: 'supplier', label: 'Supplier' },
];

export const Header = () => {
  const { activeTab, setActiveTab } = useStore();

  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Vaishali</h1>
          </div>
          
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'bg-orange-700 text-white'
                    : 'text-orange-100 hover:bg-orange-500'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
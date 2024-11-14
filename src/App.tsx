import React from 'react';
import { Header } from './components/Header';
import { Home } from './components/home/Home';
import { Host } from './components/host/Host';
import { Kitchen } from './components/kitchen/Kitchen';
import { Inventory } from './components/inventory/Inventory';
import { useStore } from './store';

function App() {
  const { activeTab } = useStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'host':
        return <Host />;
      case 'kitchen':
        return <Kitchen />;
      case 'inventory':
        return <Inventory />;
      default:
        return (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-gray-600">
              Tab content for {activeTab} will be implemented next
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
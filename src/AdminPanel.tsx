import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Managers from './pages/Managers';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Admins from './pages/Admins';

const Dashboard = () => <h1 className="text-white text-2xl">Dashboard sahifasi</h1>;

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full text-white text-xl">
          Loading...
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'managers': return <Managers />;
      case 'admins': return <Admins />;
      case 'teachers': return <Teachers />;
      case 'students': return <Students />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-black text-white">
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex justify-between items-center border-b border-gray-700">
          <div className="text-lg font-semibold capitalize">{activeSection}</div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-800 p-2 rounded">🌙</button>
            <div className="text-sm">
              <div className="font-bold">Usern88</div>
              <div className="text-gray-400">Manager</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">U</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

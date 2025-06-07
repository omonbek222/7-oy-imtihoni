import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Managers from './pages/Managers';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Admins from './pages/Admins';

const Dashboard = ({ darkMode }) => {
  return (
    <div className={`p-6 min-h-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard sahifasi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow-lg transition-shadow ${darkMode ? 'bg-[#1f1f1f] hover:shadow-indigo-600' : 'bg-gray-200 hover:shadow-indigo-300'}`}>
          <h2 className="text-xl font-semibold mb-2">Umumiy foydalanuvchilar</h2>
          <p className="text-3xl font-bold">1,245</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>So'nggi oy statistikasi</p>
        </div>

        <div className={`p-6 rounded-lg shadow-lg transition-shadow ${darkMode ? 'bg-[#1f1f1f] hover:shadow-indigo-600' : 'bg-gray-200 hover:shadow-indigo-300'}`}>
          <h2 className="text-xl font-semibold mb-2">Yangi registratsiyalar</h2>
          <p className="text-3xl font-bold">87</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Oxirgi 7 kun ichida</p>
        </div>

        <div className={`p-6 rounded-lg shadow-lg transition-shadow ${darkMode ? 'bg-[#1f1f1f] hover:shadow-indigo-600' : 'bg-gray-200 hover:shadow-indigo-300'}`}>
          <h2 className="text-xl font-semibold mb-2">Faol foydalanuvchilar</h2>
          <p className="text-3xl font-bold">562</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Bugungi holat</p>
        </div>
      </div>

      <div className={`mt-12 p-6 rounded-lg shadow-lg ${darkMode ? 'bg-[#1f1f1f]' : 'bg-gray-200'}`}>
        <h2 className="text-2xl font-bold mb-4">Yangi xabarlar</h2>
        <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>Yangi kurslar taqdimoti boshlandi.</li>
          <li>Saytga yangi funksiya qo'shildi.</li>
          <li>Foydalanuvchilar soni 1200 dan oshdi.</li>
        </ul>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderContent = () => {
    if (loading) {
      return (
        <div className={`flex justify-center items-center h-full text-xl ${darkMode ? 'text-white' : 'text-black'}`}>
          Loading...
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'managers':
        return <Managers />;
      case 'admins':
        return <Admins />;
      case 'teachers':
        return <Teachers />;
      case 'students':
        return <Students />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} h-screen w-screen flex overflow-hidden`}>
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <header className={`h-16 px-6 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className="text-lg font-semibold capitalize">{activeSection}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'} p-2 rounded transition-colors`}
              aria-label="Toggle dark mode"
            >
              🌙
            </button>
            <div className="text-sm">
              <div className="font-bold">Usern88</div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Manager</div>
            </div>
            <div className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} w-8 h-8 rounded-full flex items-center justify-center font-bold`}>
              U
            </div>
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

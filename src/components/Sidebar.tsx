import React from 'react';
import {
  FaHome, FaUserTie, FaUsers, FaChalkboardTeacher, FaUserGraduate,
  FaLayerGroup, FaBook, FaMoneyBill, FaCog, FaUserCircle, FaSignOutAlt
} from 'react-icons/fa';

interface SidebarProps {
  active: string;
  onSelect: (section: string) => void;
}

const Sidebar = ({ active, onSelect }: SidebarProps) => {
  const menu = [
    { id: 'dashboard', label: 'Asosiy', icon: <FaHome /> },
    { id: 'managers', label: 'Menegerlar', icon: <FaUserTie /> },
    { id: 'admins', label: 'Adminlar', icon: <FaUsers /> },
    { id: 'teachers', label: 'Ustozlar', icon: <FaChalkboardTeacher /> },
    { id: 'students', label: 'Studentlar', icon: <FaUserGraduate /> },
    { id: 'groups', label: 'Guruhlar', icon: <FaLayerGroup /> },
    { id: 'courses', label: 'Kurslar', icon: <FaBook /> },
    { id: 'payment', label: 'To‘lovlar', icon: <FaMoneyBill /> },
  ];

  const others = [
    { id: 'settings', label: 'Sozlamalar', icon: <FaCog /> },
    { id: 'profile', label: 'Profil', icon: <FaUserCircle /> },
    { id: 'logout', label: 'Chiqish', icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="w-64 bg-black text-white h-full border-r border-gray-800 flex flex-col">
      <div className="p-6 text-2xl font-bold">Admin CRM</div>
      <div className="px-6 py-2 text-sm text-gray-400 uppercase">Menu</div>
      <nav className="flex flex-col px-4 space-y-1">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-800 transition ${
              active === item.id ? 'bg-gray-800' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-6 pt-4 pb-2 text-sm text-gray-400 uppercase mt-auto">Boshqalar</div>
      <nav className="flex flex-col px-4 space-y-1 mb-4">
        {others.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-800 transition ${
              active === item.id ? 'bg-gray-500' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

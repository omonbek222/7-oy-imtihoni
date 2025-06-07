import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

interface Manager {
  id: string;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [search, setSearch] = useState('');
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newManager, setNewManager] = useState({
    ism: '',
    familiya: '',
    email: '',
    rol: '',
    holat: '',
  });

  useEffect(() => {
    axios.get('http://localhost:7070/api/staff/create-manager')
      .then(res => {
        setManagers(res.data);
        setFilteredManagers(res.data);
      })
      .catch(err => console.error('Xatolik:', err));
  }, []);

  useEffect(() => {
    const filtered = managers.filter((m) =>
      m.ism.toLowerCase().includes(search.toLowerCase()) ||
      m.familiya.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredManagers(filtered);
  }, [search, managers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewManager({ ...newManager, [e.target.name]: e.target.value });
  };

  const handleAddManager = () => {
    axios.post('http://localhost:7070/api/staff/create-manager', newManager)
      .then(res => {
        setManagers([...managers, res.data]);
        setFilteredManagers([...managers, res.data]);
        setNewManager({ ism: '', familiya: '', email: '', rol: '', holat: '' });
        setIsModalOpen(false);
      })
      .catch(err => console.error('Qo‘shishda xatolik:', err));
  };

  return (
    <div className="p-6 text-white w-full h-full">
      <div className="text-sm text-gray-400 mb-1">
        Asosiy &gt; <span className="text-white">Menegerlar</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Menegerlar ro'yxati</h1>

      <div className="flex justify-end items-center gap-3 mb-4">
        <div className="relative">
          <IoSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Qidiruv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded bg-[#111] text-white border border-gray-700 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Meneger qo'shish
        </button>

        <button className="bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded border border-gray-700">
          All
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#1f1f1f] text-left text-sm text-gray-300">
              <th className="py-3 px-4 font-medium">Ism</th>
              <th className="py-3 px-4 font-medium">Familiya</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Rol</th>
              <th className="py-3 px-4 font-medium">Holat</th>
              <th className="py-3 px-4 font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager) => (
                <tr
                  key={manager.id}
                  className="bg-[#111] hover:bg-[#1c1c1c] border-b border-[#1c1c1c]"
                >
                  <td className="py-3 px-4">{manager.ism}</td>
                  <td className="py-3 px-4">{manager.familiya}</td>
                  <td className="py-3 px-4">{manager.email}</td>
                  <td className="py-3 px-4">{manager.rol}</td>
                  <td className="py-3 px-4">{manager.holat}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-white">
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Hech qanday meneger topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

   
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Yangi meneger qo'shish</h2>
            <div className="space-y-3">
              {['ism', 'familiya', 'email', 'rol', 'holat'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(newManager as any)[field]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-[#111] text-white border border-gray-600 focus:outline-none"
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddManager}
                className="px-4 py-2 bg-gray-600 rounded bg-gray-600"
              >
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Managers;

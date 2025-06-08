import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';
import { FaEllipsisV } from 'react-icons/fa';

interface Group {
  id: string;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5173/api/student/create-student')
      .then(res => {
        console.log('API javobi:', res.data);

        const data = Array.isArray(res.data) ? res.data : (res.data.data ?? []);

        setGroups(data);
        setFilteredGroups(data);
      })
      .catch(err => console.error("Xatolik:", err));
  }, []);

  useEffect(() => {
    const filtered = groups.filter(g =>
      g.ism.toLowerCase().includes(search.toLowerCase()) ||
      g.familiya.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.rol.toLowerCase().includes(search.toLowerCase()) ||
      g.holat.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGroups(filtered);
  }, [search, groups]);

  return (
    <div className="p-6 text-white w-full h-full">
      <div className="text-sm text-gray-400 mb-1">
        Asosiy &gt; <span className="text-white">Guruhlar</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Guruhlar ro'yxati</h1>

      <div className="flex justify-end items-center gap-3 mb-4">
        <div className="relative">
          <IoSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Qidiruv..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded bg-[#111] text-white border border-gray-700 focus:outline-none"
          />
        </div>

        <button className="bg-[#1f1f1f] text-white px-4 py-2 rounded">
          + Guruh qo'shish
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
            {Array.isArray(filteredGroups) && filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <tr
                  key={group.id}
                  className="bg-[#111] hover:bg-[#1c1c1c] border-b border-[#1c1c1c]"
                >
                  <td className="py-3 px-4">{group.ism}</td>
                  <td className="py-3 px-4">{group.familiya}</td>
                  <td className="py-3 px-4">{group.email}</td>
                  <td className="py-3 px-4">{group.rol}</td>
                  <td className="py-3 px-4">{group.holat}</td>
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
                  Hech qanday guruh topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups;

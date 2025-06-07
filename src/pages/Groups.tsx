import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    axios.get('http://localhost:7070/api/student/added-new-group-student')
      .then(res => {
        setGroups(res.data);
        setFilteredGroups(res.data);
      })
      .catch(err => console.error('Xatolik:', err));
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-[#1f1f1f] bg-[#1f1f1f] text-white px-4 py-2 rounded">
          Guruh qo'shish
        </button>
        <input
          type="text"
          placeholder="Qidiruv..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 rounded border border-gray-700 bg-black text-white focus:outline-none"
        />
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2">Ism</th>
            <th className="border border-gray-600 px-4 py-2">Familiya</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Rol</th>
            <th className="border border-gray-600 px-4 py-2">Holat</th>
            <th className="border border-gray-600 px-4 py-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">Ma'lumot topilmadi</td>
            </tr>
          )}
          {filteredGroups.map(group => (
            <tr key={group.id} className="hover:bg-gray-900">
              <td className="border border-gray-600 px-4 py-2">{group.ism}</td>
              <td className="border border-gray-600 px-4 py-2">{group.familiya}</td>
              <td className="border border-gray-600 px-4 py-2">{group.email}</td>
              <td className="border border-gray-600 px-4 py-2">{group.rol}</td>
              <td className="border border-gray-600 px-4 py-2">{group.holat}</td>
              <td className="border border-gray-600 px-4 py-2">
                <button className="text-blue-500 hover:underline mr-2">Tahrirlash</button>
                <button className="text-red-500 hover:underline">O‘chirish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Groups;

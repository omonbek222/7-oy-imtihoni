import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Teacher {
  id: string;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    axios.get('https://admin-crm.onrender.com/ustozlar')
      .then(res => {
        setTeachers(res.data);
        setFilteredTeachers(res.data);
      })
      .catch(err => console.error('Xatolik:', err));
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(t =>
      t.ism.toLowerCase().includes(search.toLowerCase()) ||
      t.familiya.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.rol.toLowerCase().includes(search.toLowerCase()) ||
      t.holat.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [search, teachers]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
          Ustoz qo'shish
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
          {filteredTeachers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">Ma'lumot topilmadi</td>
            </tr>
          )}
          {filteredTeachers.map(teacher => (
            <tr key={teacher.id} className="hover:bg-gray-900">
              <td className="border border-gray-600 px-4 py-2">{teacher.ism}</td>
              <td className="border border-gray-600 px-4 py-2">{teacher.familiya}</td>
              <td className="border border-gray-600 px-4 py-2">{teacher.email}</td>
              <td className="border border-gray-600 px-4 py-2">{teacher.rol}</td>
              <td className="border border-gray-600 px-4 py-2">{teacher.holat}</td>
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

export default Teachers;

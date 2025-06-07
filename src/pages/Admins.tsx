import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

interface Admin {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  work_date: string;
  status: string;
  active: boolean;
  is_deleted: boolean;
}

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState<Omit<Admin, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'admin',
    work_date: new Date().toISOString().split('T')[0],
    status: 'faol',
    active: true,
    is_deleted: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:7070/api/staff/adminlar')
      .then((res) => {
        setAdmins(res.data);
      })
      .catch((err) => console.error('Xatolik:', err));
  }, []);

  const filteredAdmins = admins.filter((a) =>
    a.first_name.toLowerCase().includes(search.toLowerCase()) ||
    a.last_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = () => {
    axios
      .post('http://localhost:7070/api/staff/create-admin', newAdmin)
      .then((res) => {
        const addedAdmin = res.data.admin || res.data;
        setAdmins((prev) => [...prev, addedAdmin]);
        setShowModal(false);
        setNewAdmin({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          role: 'admin',
          work_date: new Date().toISOString().split('T')[0],
          status: 'faol',
          active: true,
          is_deleted: false,
        });
      })
      .catch((err) => console.error("Yangi admin qo‘shishda xatolik:", err));
  };

  return (
    <div className="p-6 text-white w-full h-full">
      <div className="text-sm text-gray-400 mb-1">
        Asosiy &gt; <span className="text-white">Admins</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Adminlar ro'yxati</h1>

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
          onClick={() => setShowModal(true)}
          className="bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Admin Qo'shish
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
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr
                  key={admin.id || admin.email}
                  className="bg-[#111] hover:bg-[#1c1c1c] border-b border-[#1c1c1c]"
                >
                  <td className="py-3 px-4">{admin.first_name}</td>
                  <td className="py-3 px-4">{admin.last_name}</td>
                  <td className="py-3 px-4">{admin.email}</td>
                  <td className="py-3 px-4">{admin.role}</td>
                  <td className="py-3 px-4">{admin.status}</td>
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
                  Hech qanday admin topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-xl font-bold mb-2">Yangi admin qo'shish</h2>

            {['first_name', 'last_name', 'email', 'password'].map((field) => (
              <input
                key={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                value={newAdmin[field as keyof typeof newAdmin] as string}
                onChange={handleChange}
                placeholder={field.replace('_', ' ').toUpperCase()}
                className="w-full p-2 rounded bg-[#111] text-white border border-gray-600 focus:outline-none"
              />
            ))}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddAdmin}
                className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded"
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admins;

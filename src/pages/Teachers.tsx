import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';

interface Teacher {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  field: string;
  course_id: string;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, '_id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    field: '',
    course_id: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5173/api/teacher/get-all') 
      .then(res => {
        setTeachers(res.data.teachers || []);
        setFilteredTeachers(res.data.teachers || []);
      })
      .catch(err => console.error('Xatolik:', err));
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(t =>
      t.first_name.toLowerCase().includes(search.toLowerCase()) ||
      t.last_name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.toLowerCase().includes(search.toLowerCase()) ||
      t.field.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [search, teachers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleAddTeacher = () => {
    axios.post('https://admin-crm.onrender.com', newTeacher)
      .then(res => {
        setTeachers(prev => [...prev, res.data.teacher]);
        setFilteredTeachers(prev => [...prev, res.data.teacher]);
        setShowModal(false);
        setNewTeacher({
          first_name: 'davron ',
          last_name: 'raimjanov',
          email: 'davron@gmail.com',
          phone: '887676747',
          password: '123swk d',
          field: 'itrestyuiuiyutyrdtfugi',
          course_id: '123456sdr',
        });
      })
      .catch(err => console.error("Yangi ustoz qo‘shishda xatolik:", err));
  };

  return (
    <div className="p-6 text-white w-full h-full">
      <div className="text-sm text-gray-400 mb-1">Asosiy &gt; <span className="text-white">Ustozlar</span></div>
      <h1 className="text-2xl font-semibold mb-6">Ustozlar ro'yxati</h1>

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
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded"
        >
          + Ustoz qo'shish
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
              <th className="py-3 px-4 font-medium">Telefon</th>
              <th className="py-3 px-4 font-medium">Soha</th>
              <th className="py-3 px-4 font-medium">Amallar</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">Ma'lumot topilmadi</td>
              </tr>
            ) : (
              filteredTeachers.map(teacher => (
                <tr key={teacher._id} className="bg-[#111] hover:bg-[#1c1c1c] border-b border-[#1c1c1c]">
                  <td className="py-3 px-4">{teacher.first_name}</td>
                  <td className="py-3 px-4">{teacher.last_name}</td>
                  <td className="py-3 px-4">{teacher.email}</td>
                  <td className="py-3 px-4">{teacher.phone}</td>
                  <td className="py-3 px-4">{teacher.field}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-white mr-4">Tahrirlash</button>
                    <button className="text-red-500 hover:text-red-700">O‘chirish</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-xl font-bold mb-2">Yangi ustoz qo'shish</h2>

            {[
              'first_name',
              'last_name',
              'email',
              'phone',
              'password',
              'field',
              'course_id'
            ].map(field => (
              <input
                key={field}
                name={field}
                value={newTeacher[field as keyof typeof newTeacher]}
                onChange={handleChange}
                placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
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
                onClick={handleAddTeacher}
                className="bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-indigo-700"
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

export default Teachers;

import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-black min-h-full text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard sahifasi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg hover:shadow-indigo-600 transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Umumiy foydalanuvchilar</h2>
          <p className="text-3xl font-bold">1,245</p>
          <p className="text-gray-400 mt-1">So'nggi oy statistikasi</p>
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg hover:shadow-indigo-600 transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Yangi registratsiyalar</h2>
          <p className="text-3xl font-bold">87</p>
          <p className="text-gray-400 mt-1">Oxirgi 7 kun ichida</p>
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg hover:shadow-indigo-600 transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Faol foydalanuvchilar</h2>
          <p className="text-3xl font-bold">562</p>
          <p className="text-gray-400 mt-1">Bugungi holat</p>
        </div>
      </div>

      <div className="mt-12 bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Yangi xabarlar</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Yangi kurslar taqdimoti boshlandi.</li>
          <li>Saytga yangi funksiya qo'shildi.</li>
          <li>Foydalanuvchilar soni 1200 dan oshdi.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

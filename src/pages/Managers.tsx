import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Manager {
  id: string
  ism: string
  familiya: string
  email: string
  rol: string
  holat: string
}

const Managers = () => {
  const [managers, setManagers] = useState<Manager[]>([])
  const [search, setSearch] = useState('')
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([])

  const [showModal, setShowModal] = useState(false)
  const [newManager, setNewManager] = useState({
    ism: '',
    familiya: '',
    email: '',
    rol: '',
    holat: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchManagers()
  }, [])

  const fetchManagers = () => {
    axios.get('/api/menegrlar')
      .then(res => {
        setManagers(res.data)
        setFilteredManagers(res.data)
      })
      .catch(err => {
        console.error('API dan ma\'lumot olishda xatolik:', err)
      })
  }

  useEffect(() => {
    const filtered = managers.filter(manager =>
      manager.ism.toLowerCase().includes(search.toLowerCase()) ||
      manager.familiya.toLowerCase().includes(search.toLowerCase()) ||
      manager.email.toLowerCase().includes(search.toLowerCase()) ||
      manager.rol.toLowerCase().includes(search.toLowerCase()) ||
      manager.holat.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredManagers(filtered)
  }, [search, managers])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewManager(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAddManager = () => {
    setError('')
    if (!newManager.ism || !newManager.familiya || !newManager.email) {
      setError("Iltimos, ism, familiya va emailni kiriting.")
      return
    }

    setLoading(true)

    axios.post('/api/menegrlar', newManager)
      .then(res => {
        console.log("Yangi meneger qo'shildi:", res.data)
        fetchManagers()
        setShowModal(false)
        setNewManager({ ism: '', familiya: '', email: '', rol: '', holat: '' })
      })
      .catch(err => {
        console.error("Xatolik yuz berdi:", err)
        setError('Ma\'lumot qo\'shishda xatolik yuz berdi.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Meneger qo'shish
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
          <tr className="bg-gray-900">
            <th className="border border-gray-600 px-4 py-2">Ism</th>
            <th className="border border-gray-600 px-4 py-2">Familiya</th>
            <th className="border border-gray-600 px-4 py-2">Email</th>
            <th className="border border-gray-600 px-4 py-2">Rol</th>
            <th className="border border-gray-600 px-4 py-2">Holat</th>
            <th className="border border-gray-600 px-4 py-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {filteredManagers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">
                Ma'lumot topilmadi
              </td>
            </tr>
          ) : (
            filteredManagers.map(manager => (
              <tr key={manager.id} className="hover:bg-gray-800">
                <td className="border border-gray-600 px-4 py-2">{manager.ism}</td>
                <td className="border border-gray-600 px-4 py-2">{manager.familiya}</td>
                <td className="border border-gray-600 px-4 py-2">{manager.email}</td>
                <td className="border border-gray-600 px-4 py-2">{manager.rol}</td>
                <td className="border border-gray-600 px-4 py-2">{manager.holat}</td>
                <td className="border border-gray-600 px-4 py-2">
                  <button className="text-blue-400 hover:underline mr-3" onClick={() => alert(`Tahrirlash: ${manager.ism}`)}>Tahrirlash</button>
                  <button className="text-red-500 hover:underline" onClick={() => alert(`O'chirish: ${manager.ism}`)}>O‘chirish</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded p-6 w-full max-w-md">
            <h2 className="text-xl mb-4">Yangi Meneger qo'shish</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
              type="text"
              name="ism"
              placeholder="Ism"
              value={newManager.ism}
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 rounded bg-black border border-gray-700 text-white"
            />
            <input
              type="text"
              name="familiya"
              placeholder="Familiya"
              value={newManager.familiya}
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 rounded bg-black border border-gray-700 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newManager.email}
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 rounded bg-black border border-gray-700 text-white"
            />
            <input
              type="text"
              name="rol"
              placeholder="Rol"
              value={newManager.rol}
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 rounded bg-black border border-gray-700 text-white"
            />
            <input
              type="text"
              name="holat"
              placeholder="Holat"
              value={newManager.holat}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 rounded bg-black border border-gray-700 text-white"
            />

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Bekor qilish
              </button>
              <button
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleAddManager}
                disabled={loading}
              >
                {loading ? 'Qo\'shilyapti...' : 'Qo\'shish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Managers

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeToggle } from './ThemeToggle';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios({
        url: "https://admin-crm.onrender.com/api/auth/sign-in",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });

      const token = response.data?.data?.token;
      localStorage.setItem('token', token);

      onLoginSuccess();

      navigate('/');
    } catch (err: any) {
      setError('Email yoki parol noto‘g‘ri');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black transition-colors duration-300">
      <ThemeToggle />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-[700px] max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-white">Xush kelibsiz 👋</h2>
        <p className="text-center text-gray-400 mb-6">
          Hisobingizga kirish uchun email va parolni kiriting
        </p>

        <label className="text-sm text-gray-300">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 mb-4 border rounded-lg bg-gray-800 text-white border-gray-700 focus:outline-none"
        />

        <label className="text-sm text-gray-300">Parol</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-1 mb-4 border rounded-lg bg-gray-800 text-white border-gray-700 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading || !email || !password}
          className={`w-full py-2 rounded-lg text-white ${
            loading || !email || !password
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-white text-black hover:opacity-90 transition'
          }`}
        >
          {loading ? 'Kirish...' : 'Kirish'}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:7070/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();
      } else {
        setError('Login yoki parol noto‘g‘ri!');
      }
    } catch (err) {
      setError('Login yoki parol noto‘g‘ri!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black border-2 border-gray-700 p-10 rounded-2xl shadow-2xl w-[500px]">
        <h2 className="text-3xl font-bold mb-2 text-white text-center">Xush kelibsiz 👋</h2>
        <span className="block text-sm text-gray-300 mb-6 text-center">
          Hisobingizga kirish uchun username va parolni kiriting
        </span>

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 bg-black text-white border border-gray-500 rounded-lg mb-4 placeholder:text-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Parol"
          className="w-full px-4 py-3 bg-black text-white border border-gray-500 rounded-lg mb-4 placeholder:text-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-white text-black px-4 py-2 rounded-lg w-full font-semibold hover:bg-black hover:text-white transition-colors duration-300"
        >
          Kirish
        </button>
      </div>
    </div>
  );
};

export default Login;

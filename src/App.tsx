import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminPanel from './AdminPanel'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
      <Route
        path="/"
        element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;

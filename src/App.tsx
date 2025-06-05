import React, { useState, useEffect } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // LocalStorage'dan tokenni o'qib, dastlabki holatni o'rnatamiz
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? <AdminPanel /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default App;

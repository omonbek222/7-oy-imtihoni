import React, { useState } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const handleLoginSuccess = () => {
    localStorage.setItem('token', 'dummy-token'); 
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? <AdminPanel /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default App;

import React, { useState } from 'react';
import Login from './Login';        
import AdminPanel from './AdminPanel'; 

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm'; // Import LoginForm
import RegisterForm from './Components/RegisterForm'; // Import RegisterForm

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar setIsFormVisible={setIsFormVisible} />

      {isFormVisible && (
        <div className="flex items-center justify-center h-full p-6">
          {isLogin ? (
            <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
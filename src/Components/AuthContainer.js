// AuthContainer.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {isLogin ? (
        <LoginForm onSwitch={toggleForm} />
      ) : (
        <RegisterForm onSwitch={toggleForm} />
      )}
    </div>
  );
};

export default AuthContainer;
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import axios from 'axios'; // Import Axios

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const username = formData.get('username');
    const fullname = formData.get('fullname');
    const mobile = formData.get('mobile');

    try {
      if (isLogin) {
        // Login Logic
        console.log('Attempting to login with:', { email, password });

        const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
          email,
          password
        });

        // Assuming the response structure is { token, user }
        const { token, user } = response.data;
        setIsLoggedIn(true);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        e.target.reset();
        console.log('Login successful:', response.data);
      } else {
        // Registration Logic
        if (password !== confirmPassword) {
          setError('Passwords do not match!');
          return;
        }

        const newUser = { email, password, username, fullname, mobile };

        const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', newUser);

        // Assuming the response structure is { message, token, user }
        if (response.status === 201) {
          setSuccessMessage('Successfully registered!');
          setError('');
          console.log('Registration successful:', response.data);
          setTimeout(() => {
            setIsLogin(true);
            setSuccessMessage('');
          }, 1000);
        } else {
          setError(response.data.message || 'Registration failed!');
          console.log("Registration Error:", response.data);
        }
      }
    } catch (error) {
      setError('Something went wrong');
      console.error("Unexpected Error:", error.response ? error.response.data : error); // Detailed error handling
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar setIsFormVisible={setIsFormVisible} setIsLogin={setIsLogin} />

      {isFormVisible && !isLoggedIn && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Login' : 'Register'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block mb-2 text-sm">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter your full name"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter your mobile number"
                      className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-gray-600 py-2 rounded hover:bg-gray-700 transition"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
            <p className="text-center mt-4">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccessMessage('');
                }}
                className="text-gray-400 hover:underline"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}

      {successMessage && !isLoggedIn && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{successMessage}</h1>
          </div>
        </div>
      )}

      {isLoggedIn && user && (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome back, {user.username}!</h1>
            <div className="text-lg mb-6">
              <p>Here are your exclusive features:</p>
              {/* Add features or links here */}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

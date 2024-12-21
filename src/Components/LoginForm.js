// LoginForm.js
import React from 'react';

const LoginForm = ({ onSwitch }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2 text-sm text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-gray-400">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 py-2 rounded hover:bg-gray-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        Don't have an account?{' '}
        <button
          onClick={onSwitch} // Call the switch function passed as a prop
          className="text-gray-400 hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
// RegisterForm.js
import React from 'react';

const RegisterForm = ({ onSwitch }) => {
  const InputField = ({ label, type, name, placeholder, required }) => {
    return (
      <div>
        <label className="block mb-2 text-sm text-gray-400">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required={required}
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
      <form className="space-y-4">
        <InputField label="Email" type="email" name="email" placeholder="Enter your email" required />
        <InputField label="Password" type="password" name="password" placeholder="Enter your password" required />
        <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" required />
        <InputField label="Username" type="text" name="username" placeholder="Enter your username" required />
        <InputField label="Full Name" type="text" name="fullname" placeholder="Enter your full name" required />
        <InputField label="Mobile Number" type="tel" name="mobile" placeholder="Enter your mobile number" required />
        <button
          type="submit"
          className="w-full bg-gray-600 py-2 rounded hover:bg-gray-700 transition duration-200 text-white font-semibold"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-gray-400">
        Already have an account?{' '}
        <button
          onClick={onSwitch} // Call the switch function passed as a prop
          className="text-gray-400 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
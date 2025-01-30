// LoginPage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = ({ onClose, openRegister }) => {
    const { loginUser , errorMessage } = useContext(AuthContext); // Get errorMessage from context

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const success = await loginUser (e); // Call loginUser  and get success status
        if (success) {
            onClose(); // Close the modal only if login is successful
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-400">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-300 py-2 rounded hover:bg-gray-200 transition"
                >
                    Login
                </button>
            </form>
            {errorMessage && <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>} {/* Display error message */}
            <p className="text-center mt-4 text-gray-400">
                Don't have an account?{' '}
                <button
                    onClick={openRegister} // Call the function to open the register modal
                    className="text-blue-400 hover:underline"
                >
                    Register here
                </button>
            </p>
        </div>
    );
};

export default LoginPage;
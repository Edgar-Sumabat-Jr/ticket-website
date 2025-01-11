import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext);

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            <form
                onSubmit={loginUser}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className="w-full p-2 bg-gray-200 rounded focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="w-full p-2 bg-gray-200 rounded focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value="Login"
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    />
                </div>
            </form>
        </div>
    );
};

export default LoginPage;

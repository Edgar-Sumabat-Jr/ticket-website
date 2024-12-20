import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ onLogin }) => {
  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => onLogin(values)}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm text-gray-400">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-400">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => alert('Switch to register form')}
            className="text-blue-400 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

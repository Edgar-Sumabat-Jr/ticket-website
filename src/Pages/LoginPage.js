import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginPage = ({ onLogin }) => {
  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => onLogin(values)}
      >
        {() => (
          <Form className="login-form">
            <h2>Login</h2>

            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button">Login</button>

            <p className="register-link">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

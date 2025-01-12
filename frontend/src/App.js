// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/LoggedInPage';

import Navbar from './components/Navbar';
import Register from './components/Register'; // Import the RegisterPage component

import './pages/LoginPage.css';
import './components/Navbar.css';
import './components/Register.css';


import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} /> {/* Add the Register route */}
            <Route path="/profile" element={<PrivateRoute><LoggedInPage /></PrivateRoute>} />

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
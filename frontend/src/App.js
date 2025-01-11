// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import the RegisterPage component
import Navbar from './components/Navbar';
import LoggedInPage from './pages/LoggedInPage';

import './components/Navbar.css';
import './components/Register.css';
import './pages/LoginPage.css';

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
            <Route path="/register" element={<RegisterPage />} /> {/* Add the Register route */}
            <Route path="/profile" element={<PrivateRoute><LoggedInPage /></PrivateRoute>} />

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
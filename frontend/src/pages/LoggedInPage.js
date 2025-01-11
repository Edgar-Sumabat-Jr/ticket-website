// Rename HomePage to LoggedInPage
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const LoggedInPage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (authTokens) {
      getProfile();
    } else {
      logoutUser();  // Redirect to login if not authenticated
    }
  }, [authTokens, logoutUser]);

  const getProfile = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });
    const data = await response.json();
    if (response.status === 200) {
      setProfile(data);
    } else if (response.statusText === 'Unauthorized') {
      logoutUser();  // If not authorized, log out and redirect to login
    }
  };

  return (
    <div>
      <h1>Welcome to the Logged-In Page!</h1>
      <p>Name: {profile.first_name} {profile.last_name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default LoggedInPage;

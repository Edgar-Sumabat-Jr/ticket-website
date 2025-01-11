import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null));
    const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null));
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value}),
        });

        let data = await response.json();

        if (data && response.ok) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            navigate('/'); // Redirect to home after login
        } else {
            alert('Check login credentials: Something went wrong while logging in!');
        }
    };

    let logoutUser = () => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/login'); // Redirect to login after logout
    };

    const updateToken = async () => {
        if (!authTokens) return; // Don't make a request if no tokens exist

        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser(); // If refresh fails, logout user
        }

        if (loading) {
            setLoading(false);
        }
    };

    let contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (loading) {
            updateToken(); // Initial token update on first load
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken(); // Periodically update token
            }
        }, REFRESH_INTERVAL);
        
        return () => clearInterval(interval); // Clean up interval
    }, [authTokens, loading]);

    // Ensure user isn't redirected unless necessary (loading state matters here)
    useEffect(() => {
        if (loading) return; // Don't do anything while loading
        if (!user) {
            navigate('/'); // Redirect to login if user is not authenticated
        }
    }, [user, loading, navigate]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

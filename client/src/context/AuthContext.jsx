import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Attempt to load user from token on startup
        const token = localStorage.getItem('sweatToFit_token');
        if (token) {
            axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error("Token invalid or expired", err);
                    localStorage.removeItem('sweatToFit_token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const register = async (userData) => {
        try {
            const res = await axios.post('/api/auth/register', userData);
            const { token, user: newUser } = res.data;
            localStorage.setItem('sweatToFit_token', token);
            setUser(newUser);
            return newUser;
        } catch (err) {
            throw new Error(err.response?.data?.msg || err.message || "Registration failed");
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            const { token, user: loggedInUser } = res.data;
            localStorage.setItem('sweatToFit_token', token);
            setUser(loggedInUser);
            return loggedInUser;
        } catch (err) {
            throw new Error(err.response?.data?.msg || err.message || "Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sweatToFit_token');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

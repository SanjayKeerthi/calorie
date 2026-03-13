import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('sweatToFit_token');
            if (token) {
                try {
                    const res = await axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
                    setUser(res.data);
                } catch (err) {
                    console.error("Token invalid or expired", err);
                    localStorage.removeItem('sweatToFit_token');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUser();
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

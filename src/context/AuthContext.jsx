import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        // In a real app, you might validate the token with the backend here
        // For now, we assume if the token exists, the user is authenticated
        // Since we don't have the user details, we can modify the backend to return them on login
        // or add a /me endpoint. For now, we'll just set a flag.
         setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // This backend expects x-www-form-urlencoded (username/password)
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const { access_token } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser({ email, token: access_token });
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const register = async (email, password) => { 
      try {
          await api.post('/auth/register', { email, password });
           toast.success('Registration successful! Please login.');
           return true;
      } catch (error) {
           console.error(error);
           toast.error(error.response?.data?.detail || 'Registration failed');
           return false;
      }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

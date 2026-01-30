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
    console.log('Attempting login to:', api.defaults.baseURL + '/auth/login');
    try {
      // Use URLSearchParams for application/x-www-form-urlencoded format
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
      console.error('DEBUG - Login Error:', error);
      let errorMessage = 'Unknown error';
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => `${err.msg} (${err.loc.join('.')})`).join(', ');
        } else {
          errorMessage = JSON.stringify(error.response.data.detail);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(`Login Error: ${errorMessage}`, { duration: 6000 });
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

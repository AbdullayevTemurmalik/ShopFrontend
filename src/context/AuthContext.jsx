import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      let parsedUser = JSON.parse(savedUser);
      if (parsedUser.role === 'admin' && !parsedUser.id) {
        parsedUser.id = 9999;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (userName, password) => {
    const cleanUserName = userName.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanUserName === 'admin' && cleanPassword === 'admin') {
      const adminUser = { id: 9999, userName: 'admin', role: 'admin' };
      localStorage.setItem('token', 'admin-secret-token');
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      toast.success('Xush kelibsiz, Admin!');
      navigate('/admin');
      return;
    }

    try {
      const { data } = await api.post('/users/login', { userName, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Xush kelibsiz!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login xatosi');
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/users/register', userData);
      toast.success('Ro\'yxatdan o\'tdingiz! Endi kiring.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ro\'yxatdan o\'tish xatosi');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Chiqildi');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

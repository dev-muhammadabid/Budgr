import api from './api';

export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data.token;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};

export const register = async (email, password) => {
  try {
    await api.post('/auth/register', { email, password });
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Registration failed');
  }
};

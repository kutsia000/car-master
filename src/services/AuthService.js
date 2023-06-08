import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import api from './api';

const AuthServiceContext = createContext();

const AuthService = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      //console.log(credentials);
      const response = await api.post('/Auth/LogIn', credentials);
      //console.log(response);
      if (response.status === 200) {
        const { isSuccess, code, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          //console.log(response.data);
          const { token } = response.data;

          Cookies.set('Token', token, { expires: 1 / 48 });

          setAuthenticated(true);

          navigate('/user');
        }
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {}
  };

  const logout = () => {
    Cookies.remove('Token');

    setAuthenticated(false);

    navigate('/login');
  };

  return (
    <AuthServiceContext.Provider value={{ authenticated, login, logout, error }}>
      {children}
    </AuthServiceContext.Provider>
  );
};

export { AuthService, AuthServiceContext };

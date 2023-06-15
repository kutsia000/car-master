import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import api from './authApi';

const AuthServiceContext = createContext();

const AuthService = ({ children }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  const lang = i18n.language;

  const login = async (credentials) => {
    try {
      const response = await api.post('/Auth/LogIn', credentials);

      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          const { token, isAdmin } = response.data;

          Cookies.set('Token', token);
          localStorage.setItem('IsAdmin', isAdmin);

          setAuthenticated(true);

          isAdmin ? navigate(`/${lang}/admin/dashboard`) : navigate(`/${lang}/user/dashboard`);
        }
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      const token = Cookies.get('Token');
      const response = await api.post(
        '/Auth/LogOut',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          alert(message);
        } else {
          navigate(`/${lang}/login`);
        }
      }
    } catch (error) {}
    Cookies.remove('Token');

    localStorage.removeItem('IsAdmin');

    setAuthenticated(false);

    navigate(`/${lang}/login`);
  };

  return (
    <AuthServiceContext.Provider value={{ authenticated, login, logout, error }}>
      {children}
    </AuthServiceContext.Provider>
  );
};

export { AuthService, AuthServiceContext };

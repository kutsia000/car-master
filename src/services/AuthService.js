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

  const dashboardUrls = {
    1: `/${lang}/admin/dashboard`,
    2: `/${lang}/dealer/dashboard`,
    3: `/${lang}/employee/dashboard`,
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/Auth/LogIn', credentials);

      if (response.status === 200) {
        const { isSuccess, message } = response.data;
        if (!isSuccess) {
          setError(message);
        } else {
          const { token, userTypeId } = response.data;

          Cookies.set('Token', token);
          localStorage.setItem('userTypeId', userTypeId);

          setAuthenticated(true);

          if (dashboardUrls.hasOwnProperty(userTypeId)) {
            navigate(dashboardUrls[userTypeId]);
          } else {
            // Handle the case when userTypeId does not exist
            navigate(`/${lang}`);
          }
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

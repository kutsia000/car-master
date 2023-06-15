import { createContext, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import adminApi from './adminApi';
//import { useTranslation } from 'react-i18next';

const AdminServiceContext = createContext();

const AdminService = ({ children }) => {
  //const navigate = useNavigate();
  const [error, setError] = useState(null);
  //const { i18n } = useTranslation();

  // const lang = i18n.language;

  const home = async () => {
    try {
      const response = await adminApi.post('/Admin/Home');
      if (response.status === 200) {
        const { isSuccess, message, code } = response.data;
        if (!isSuccess) {
          setError(message);
        }
        console.log(code);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AdminServiceContext.Provider value={{ home, error }}>{children}</AdminServiceContext.Provider>
  );
};

export { AdminService, AdminServiceContext };

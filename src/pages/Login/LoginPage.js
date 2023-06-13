import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { AuthService } from '../../services/AuthService';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';

const LoginPage = () => {
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const lang = i18n.language;

  useEffect(() => {
    const checkUserTypeAndToken = () => {
      const userType = localStorage.getItem('IsAdmin');
      const token = Cookies.get('Token');
      if (token) {
        const dashboardPath = `/${lang}/${userType === 'true' ? 'admin' : 'user'}/dashboard`;
        navigate(dashboardPath);
      } else {
        setIsLoading(false);
      }
    };

    checkUserTypeAndToken();
  }, [navigate, lang]);

  if (isLoading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <AuthService>
        <LoginForm></LoginForm>
        <Outlet />
      </AuthService>
    </>
  );
};

export default LoginPage;

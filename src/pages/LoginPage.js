import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../containers/LoginForm/LoginForm';
import { AuthService } from '../services/AuthService';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../components/Loading/Loading';
import dashboardUrls from '../utils/urlsDictionary';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppFooter from '../containers/Footer/AppFooter';
const LoginPage = () => {
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const lang = i18n.language;

  useEffect(() => {
    const checkUserTypeAndToken = () => {
      const userTypeId = localStorage.getItem('userTypeId');
      const token = Cookies.get('Token');
      //console.log([token, userTypeId]);
      if (token) {
        if (dashboardUrls.hasOwnProperty(userTypeId)) {
          navigate(`/${lang}${dashboardUrls[userTypeId]}`);
        } else {
          // Handle the case when userTypeId does not exist
          navigate(`/${lang}`);
        }
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
        <AppInfoHeader />
        <AppHeader />
        <LoginForm/>
        <MapDrawer/>
        <AppFooter/>
        <Outlet />
      </AuthService>
    </>
  );
};

export default LoginPage;

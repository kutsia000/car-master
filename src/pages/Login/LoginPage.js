import React from 'react';
import { Outlet } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { AuthService } from '../../services/AuthService';

const LoginPage = () => {
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

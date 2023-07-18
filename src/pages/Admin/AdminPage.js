import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AdminService } from '../../services/AdminService';
import AdminDashboard from '../../containers/Admin/Dashboard';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
//import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

const AdminDashboardPage = () => {
  // const { i18n } = useTranslation();
  // const lang = i18n.language || 'en';
  return (
    <>
      <h1>admin dashboard</h1>
      <AuthService>
        <AxiosInterceptor>
          <LogOut />
          <AdminService>
            <AdminDashboard />
            <Outlet />
          </AdminService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default AdminDashboardPage;

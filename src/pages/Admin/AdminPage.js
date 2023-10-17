import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AdminService } from '../../services/AdminService';
import AdminDashboard from '../../components/Admin/AppAdminDashboard/Dashboard';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
//import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import AppAdminHeader from '../../components/Admin/AppAdminHeader/AppAdminHeader';

const AdminDashboardPage = () => {
  // const { i18n } = useTranslation();
  // const lang = i18n.language || 'en';
  return (
    <>
      <AuthService>
        <AxiosInterceptor>
          <AdminService>
            <AppAdminHeader />
            <LogOut />
            <AdminDashboard />
            <Outlet />
          </AdminService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default AdminDashboardPage;

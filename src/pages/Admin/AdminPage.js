import React from 'react';
import { AuthService } from '../../services/AuthService';
import { AdminService } from '../../services/AdminService';
import AdminDashboard from '../../components/Admin/AppAdminDashboard/Dashboard';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
//import { useTranslation } from 'react-i18next';
import AppAdminHeader from '../../components/Admin/AppAdminHeader/AppAdminHeader';
import AdminHomePage from '../AdminHomePage';

const AdminDashboardPage = () => {
  // const { i18n } = useTranslation();
  // const lang = i18n.language || 'en';
  return (
    <>
      <AuthService>
        <AxiosInterceptor>
          <AdminService>
            <AppAdminHeader />
            <AdminDashboard />
            <AdminHomePage />
            {/* <Outlet /> */}
          </AdminService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default AdminDashboardPage;

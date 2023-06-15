import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AdminService } from '../../services/AdminService';
import AdminDashboard from '../../containers/Admin/Dashboard';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';

const AdminDashboardPage = () => {
  return (
    <>
      <h1>admin dashboard</h1>
      <AuthService>
        <AxiosInterceptor>
          <AdminService>
            <AdminDashboard />
          </AdminService>
          <LogOut />
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default AdminDashboardPage;

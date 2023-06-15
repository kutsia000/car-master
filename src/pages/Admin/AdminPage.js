import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AdminService } from '../../services/AdminService';
import AdminDashboard from '../../containers/Admin/Dashboard';

const AdminDashboardPage = () => {
  return (
    <>
      <h1>admin dashboard</h1>
      <AuthService>
        <AdminService>
          <AdminDashboard />
        </AdminService>
        <LogOut />
      </AuthService>
    </>
  );
};

export default AdminDashboardPage;

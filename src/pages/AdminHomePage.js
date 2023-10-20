import React from 'react';
import AppAdminHeader from '../components/Admin/AppAdminHeader/AppAdminHeader';
import AdminDashboard from '../components/Admin/AppAdminDashboard/Dashboard';
import AppAdminHomeFilter from '../components/Admin/AppAdminHomeFilter/AppAdminHomeFilter';
import AppAdminDialog from '../components/Admin/AppAdminDialog/AppAdminDialog';
import { Outlet } from 'react-router-dom';
import { AxiosInterceptor } from '../services/AxiosInterceptor';
import { AdminService } from '../services/AdminService';

export default function AdminHomePage() {
  return (
    <div className='admin-layout'>
      {/* <AxiosInterceptor>
        <AdminService> */}
      {/* <AppAdminHeader /> */}
      {/* <AdminDashboard /> */}
      <Outlet />
      {/* <AppAdminHomeFilter /> */}
      {/* </AdminService>
      </AxiosInterceptor> */}

      {/* <AppAdminDialog /> */}
    </div>
  );
}

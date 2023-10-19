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
    <>
      <AppAdminHeader />

      <AxiosInterceptor>
        <AdminService>
          <div
            style={{
              padding: '100px 0',
              position: 'absolute',
              width: 'calc(100vw - 240px)',
              height: 'fit-content',
              background: 'black',
              right: 0,
              top: 0,
            }}
          >
            <AdminDashboard />
            <Outlet />
            {/* <AppAdminHomeFilter /> */}
          </div>
        </AdminService>
      </AxiosInterceptor>

      {/* <AppAdminDialog /> */}
    </>
  );
}

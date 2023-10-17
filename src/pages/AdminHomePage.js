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
      <div style={{ display: 'flex' }}>
        <AxiosInterceptor>
          <AdminService>
            <AdminDashboard />
            <div
              style={{
                background: 'black',
                height: '100vh',
                width: 'calc(100% - 240px)',
                top: 100,
                left: 240,
                padding: 20,
              }}
            >
              <Outlet />
              {/* <AppAdminHomeFilter /> */}
            </div>
          </AdminService>
        </AxiosInterceptor>
      </div>
      {/* <AppAdminDialog /> */}
    </>
  );
}

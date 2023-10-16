import React from 'react';
import AppAdminHeader from '../components/Admin/AppAdminHeader/AppAdminHeader';
import AdminDashboard from '../components/Admin/AppAdminDashboard/Dashboard';
import AppAdminHomeFilter from '../components/Admin/AppAdminHomeFilter/AppAdminHomeFilter';

export default function AdminHomePage() {
  return (
    <>
      <AppAdminHeader />
      <div style={{ display: 'flex' }}>
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
          <AppAdminHomeFilter />
        </div>
      </div>
    </>
  );
}

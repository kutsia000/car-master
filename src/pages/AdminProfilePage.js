import React from 'react';
import AdminDashboard from '../components/Admin/AppAdminDashboard/Dashboard';
import AppAdminHeader from '../components/Admin/AppAdminHeader/AppAdminHeader';
import AppAdminProfile from '../components/Admin/AppAdminProfile/AppAdminProfile';

export default function AdminProfilePage() {
  return (
    <div style={{paddingBottom: 40}}>
      <AppAdminProfile />
    </div>
  );
}

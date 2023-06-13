import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';

const AdminDashboard = () => {
  return (
    <>
      <h1>admin dashboard</h1>
      <AuthService>
        <LogOut />
      </AuthService>
    </>
  );
};

export default AdminDashboard;

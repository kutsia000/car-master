import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';

const UserDashboard = () => {
  return (
    <>
      <h1>user dashboard</h1>
      <AuthService>
        <LogOut />
      </AuthService>
    </>
  );
};

export default UserDashboard;

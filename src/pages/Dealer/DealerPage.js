import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';

const DealerDashboard = () => {
  return (
    <>
      <h1>dealer dashboard</h1>
      <AuthService>
        <LogOut />
      </AuthService>
    </>
  );
};

export default DealerDashboard;

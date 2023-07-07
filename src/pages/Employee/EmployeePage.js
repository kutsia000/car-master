import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';

const EmployeeDashboard = () => {
  return (
    <>
      <h1>Employee dashboard</h1>
      <AuthService>
        <LogOut />
      </AuthService>
    </>
  );
};
export default EmployeeDashboard;

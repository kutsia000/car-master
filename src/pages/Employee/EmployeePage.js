import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { EmployeeService } from '../../services/Employee/EmployeeService';
import AppAdminHeader from '../../components/Admin/AppAdminHeader/AppAdminHeader';
import EmployeeDashboard from '../../containers/Employee/EmployeeDashboard';
import EmployeeHomePage from './EmployeeHomePage';

const EmployeeDashboardPage = () => {
  return (
    <>
      <AuthService>
        <AxiosInterceptor>
          <LogOut />
          <EmployeeService>
            <AppAdminHeader />
            <EmployeeDashboard />
            <EmployeeHomePage />
          </EmployeeService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};
export default EmployeeDashboardPage;

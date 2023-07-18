import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { DealerService } from '../../services/Dealer/DealerService';
import { Outlet } from 'react-router-dom';
import DealerDashboard from '../../containers/Dealer/Dashboard';

const DealerDashboardPage = () => {
  return (
    <>
      <AuthService>
        <AxiosInterceptor>
          <LogOut />
          <DealerService>
            <DealerDashboard />
            <Outlet />
          </DealerService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default DealerDashboardPage;

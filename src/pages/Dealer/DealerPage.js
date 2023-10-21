import React from 'react';
import LogOut from '../../containers/Header/Subcomponents/LogOut/LogOut';
import { AuthService } from '../../services/AuthService';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { DealerService } from '../../services/Dealer/DealerService';

import DealerDashboard from '../../containers/Dealer/Dashboard';
import AppAdminHeader from '../../components/Admin/AppAdminHeader/AppAdminHeader';
import DealerHomePage from './DealerHomePage';

const DealerDashboardPage = () => {
  return (
    <>
      <AuthService>
        <AxiosInterceptor>
          <LogOut />
          <DealerService>
            <AppAdminHeader />
            <DealerDashboard />
            <DealerHomePage />
          </DealerService>
        </AxiosInterceptor>
      </AuthService>
    </>
  );
};

export default DealerDashboardPage;

import React from 'react';
import BecomeDealer from '../../containers/DealerRequests/BecomeDealer';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../../containers/Header/AppHeader';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../../containers/Footer/AppFooter';

const BecomeDealerPage = () => {
  return (
    <AxiosInterceptor>
      <LandingService>
        <AppInfoHeader />
        <AppHeader />
        <BecomeDealer />
        <MapDrawer />
        <AppFooter />
      </LandingService>
    </AxiosInterceptor>
  );
};

export default BecomeDealerPage;

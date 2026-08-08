import React from 'react';
import BecomeDealer from '../../containers/DealerRequests/BecomeDealer';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../../containers/Header/AppHeader';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../../containers/Footer/AppFooter';
import AppPageTitle from '../../components/AppPageTitle/AppPageTitle';

const BecomeDealerPage = () => {
  return (
    <AxiosInterceptor>
      <LandingService>
        <AppInfoHeader />
        <AppHeader />
        <AppPageTitle title="გახდი დილერი" />
        <BecomeDealer />
        <MapDrawer />
        <AppFooter />
      </LandingService>
    </AxiosInterceptor>
  );
};

export default BecomeDealerPage;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../../containers/Header/AppHeader';
import AppHeroSlider from '../../components/AppHero/AppHeroSlider';
import AppFindCar from '../../components/AppFindCar/AppFindCar';
import AppService from '../../components/AppService/AppService';
import AppCustomers from '../../components/AppCustomers/AppCustomers';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../../containers/Footer/AppFooter';
import AppCalculator from '../../components/AppCalculator/AppCalculator';
import AppFindYourOffer from '../../components/AppFindYourOffer/AppFindYourOffer';
import AppCheckCar from '../../components/AppHero/AppCheckCar';

const Landing = () => {
  return (
    <>
      {/* <h1>landing page</h1>
    <AxiosInterceptor>
      <LandingService>
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </LandingService>
    </AxiosInterceptor> */}
      <AppInfoHeader />
      <AppHeader />
      <AppHeroSlider />
      <AppCheckCar/>
      <AppFindCar />
      <AppService/>
      <AppCalculator/>
      <AppFindYourOffer/>
      <AppCustomers/>
      <MapDrawer/>
      <AppFooter/>
    </>
  );
};

export default Landing;

import React, { useContext, useEffect, useState } from 'react';
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
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { getLandingHome } = useContext(LandingServiceContext);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [params, setParams] = useState({
    id: null,
    languageCode: lang,
    page: null,
    pageSize: null,
  });

  const fetchData = async () => {
    await getLandingHome(params);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppHeroSlider />
      <AppCheckCar />
      <AppService />
      {/* <AppCalculator />
      <AppFindYourOffer /> */}
      <AppCustomers />
      <MapDrawer />

      <AppFooter />
    </>
  );
};

export default Landing;

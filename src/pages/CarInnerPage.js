import React, { useContext, useEffect, useState } from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppFooter from '../containers/Footer/AppFooter';
import AppCarInner from '../components/AppCarInner/AppCarInner';
import AppFindCar from '../components/AppFindCar/AppFindCar';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { LandingServiceContext } from '../services/LandingServices/LandingService';
import LoadingMarkUp from '../components/Loading/Loading';

export default function CarInnerPage() {
  const { searchCar} = useContext(LandingServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { vinCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await searchCar(vinCode);
      setLoading(false);
    };

    if (vinCode) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LoadingMarkUp />;
  }
  const images = {
    first: '/images/car-inner-1.jpg',
    second: '/images/car-inner-2.jpg',
    third: '/images/car-inner-3.jpg',
    fourth: '/images/car-inner-4.jpg',
  };
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppCarInner images={images} />
      <AppFindCar />
      <MapDrawer />
      <AppFooter />
    </>
  );
}

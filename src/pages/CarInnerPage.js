import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppFooter from '../containers/Footer/AppFooter';
import AppCarCard from '../components/AppFindCar/AppCarCard';
import AppCarInner from '../components/AppCarInner/AppCarInner';
import AppFindCar from '../components/AppFindCar/AppFindCar';

export default function CarInnerPage() {
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

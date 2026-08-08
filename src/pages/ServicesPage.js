import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import AppPageTitle from '../components/AppPageTitle/AppPageTitle';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppFooter from '../containers/Footer/AppFooter';
import AppWhatWeOffer from '../components/AppWhatWeOffer/AppWhatWeOffer';

export default function ServicesPage() {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppPageTitle title="ჩვენი სერვისები" />
      <AppWhatWeOffer/>
      <MapDrawer />
      <AppFooter />
    </>
  );
}

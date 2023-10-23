import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import AppPageTitle from '../components/AppPageTitle/AppPageTitle';
import AppFooter from '../containers/Footer/AppFooter';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppAboutUs from '../components/AppAboutUs/AppAboutUs';
import AppWhatWeOffer from '../components/AppWhatWeOffer/AppWhatWeOffer';
import AppCustomers from '../components/AppCustomers/AppCustomers';

export default function AboutUsPage() {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppPageTitle title="ჩვენს შესახებ" />
      <AppAboutUs />
      <AppWhatWeOffer />
      {/* <AppCustomers/> */}
      <MapDrawer />
      <AppFooter />
    </>
  );
}

import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import AppPageTitle from '../components/AppPageTitle/AppPageTitle';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppFooter from '../containers/Footer/AppFooter';
import AppContactUs from '../components/AppContactUs/AppContactUs';

export default function ContactPage() {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppPageTitle title="კონტაქტი" />
      <AppContactUs />
      <MapDrawer />
      <AppFooter />
    </>
  );
}

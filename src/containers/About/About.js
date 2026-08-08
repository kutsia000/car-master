import React from 'react';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../Header/AppHeader';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../Footer/AppFooter';

const About = () => {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <>about</>
      <MapDrawer />
      <AppFooter />
    </>
  );
};

export default About;

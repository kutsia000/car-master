import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import AppFooter from '../containers/Footer/AppFooter';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppBlogInner from '../components/AppBlogInner/AppBlogInner';

export default function BlogInnerPage() {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppBlogInner />
      <MapDrawer />
      <AppFooter />
    </>
  );
}

import React from 'react';
import AppInfoHeader from '../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../containers/Header/AppHeader';
import AppPageTitle from '../components/AppPageTitle/AppPageTitle';
import AppFooter from '../containers/Footer/AppFooter';
import MapDrawer from '../components/MapDrawers/MapDrawer';
import AppBlog from '../components/AppBlog/AppBlog';

export default function BlogPage() {
  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      <AppPageTitle title="ბლოგი" />
      <AppBlog />
      <MapDrawer />
      <AppFooter />
    </>
  );
}

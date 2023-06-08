import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';

const Landing = () => {
  return (
    <>
      <h1>landing page</h1>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
};

export default Landing;

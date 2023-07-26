import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';

const Landing = () => {
  return (
    <>
      <h1>landing page</h1>
      <AxiosInterceptor>
        <LandingService>
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </LandingService>
      </AxiosInterceptor>
    </>
  );
};

export default Landing;

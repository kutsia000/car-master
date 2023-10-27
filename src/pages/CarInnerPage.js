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
import AppContainer from '../layout/AppContainer/AppContainer';

export default function CarInnerPage() {
  const { searchCar, car } = useContext(LandingServiceContext);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (car) {
      let imgs = [car.mainImageUrl, ...car.imageURLs];
      let images = imgs.map((i) => `https://cl1ne.ge${i}`);
      setImages(images);
    }
  }, [car]);

  if (loading) {
    return <LoadingMarkUp />;
  }
  // const images = [
  //   {
  //     original: '/images/car-inner-1.jpg',
  //     thumbnail: '/images/car-inner-1.jpg',
  //   },
  //   {
  //     original: '/images/car-inner-2.jpg',
  //     thumbnail: '/images/car-inner-2.jpg',
  //   },
  //   {
  //     original: '/images/car-inner-3.jpg',
  //     thumbnail: '/images/car-inner-3.jpg',
  //   },
  //   {
  //     original: '/images/car-inner-4.jpg',
  //     thumbnail: '/images/car-inner-4.jpg',
  //   },
  // ];
  //const iframeUrl = 'https://www.youtube.com/embed/8YFcnEaKfTk?si=tZlbo35hVOiLVz59';

  return (
    <>
      <AppInfoHeader />
      <AppHeader />
      {car ? (
        <>
          <AppCarInner images={images} data={car} />
          <section style={{ background: 'black', padding: '40px 0 60px' }}>
            <AppContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                  width="820"
                  height="435"
                  src={car && car.trackingUrl}
                  title="iframe"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </AppContainer>
          </section>
        </>
      ) : (
        <>
          <section style={{ background: 'black', padding: '40px 0 60px' }}>
            <AppContainer>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label style={{ color: 'white', fontSize: '48px' }}>Car Not Found</label>
              </div>
            </AppContainer>
          </section>
        </>
      )}
      <MapDrawer />
      <AppFooter />
    </>
  );
}

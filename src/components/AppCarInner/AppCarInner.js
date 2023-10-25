import React, { useState, useEffect } from 'react';
import styles from './AppCarInner.module.scss';
import AppImage from '../AppImage/AppImage';
import AppContainer from '../../layout/AppContainer/AppContainer';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import ImageGallery from 'react-image-gallery';
import classNames from 'classnames';

export default function AppCarInner({ images, data }) {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    if (data) {
      let imgs = [data.mainImageUrl, ...data.imageURLs];
      let images = imgs.map((i) => {
        return {
          original: `https://cl1ne.ge${i}`,
          thumbnail: `https://cl1ne.ge${i}`,
        };
      });
      setImgs(images);
    }
  }, [data]);
  //console.log(imgs);
  return (
    <section className={styles.AppCarInner}>
      <AppContainer>
        <div className={styles.AppCarInner__wrapper}>
          <div className={styles.AppCarInner__images}>
            {imgs.length > 0 && <ImageGallery items={imgs} sizes={600} />}
          </div>
          <div className={styles.AppCarInner__details}>
            <h3 className={styles['AppCarInner__details--title']}>
              {data.prodYear} {data.carMarkName} {data.carModelName}
            </h3>
            <div className={styles['AppCarInner__details--points']}>
              <span>{data.prodYear}</span>
              <span>{data.carMarkName}</span>
              <span>{data.carModelName}</span>
            </div>
            {/* <span className={styles['AppCarInner__details--code']}>კოდი: 33541774</span>
            <div className={styles['AppCarInner__details--price']}>$41,085.00</div> */}
            <div className={styles['AppCarInner__details--additional']}>დამატებითი ინფორმაცია</div>
            <div className={[styles['AppCarInner__details--info']]}>
              <span>წელი: </span>
              <span>{data.prodYear}</span>
              <span>მწარმოებელი:</span>
              <span>{data.carMarkName}</span>
              <span>მოდელი:</span>
              <span>{data.carModelName}</span>
              <span>სტატუსი:</span>
              <span>{data.carStatusName}</span>
              <span>ლოკაცია:</span>
              <span>{data.locationName}</span>
              <span>VIN კოდი:</span>
              <span>{data.vincode}</span>
              <span>მიმღები პორტი:</span>
              <span>{data.recieverPortName}</span>
              <span>კონტეინერის გახსნის თარიღი:</span>
              <span>{data.containerOpen}</span>
              <span>კონტეინერის ნომერი:</span>
              <span>{data.containerNumber}</span>
              <span>აუქციონი:</span>
              {/* <span>{data.auctionName}</span>
              <span>Interior Color:</span>
              <span>Jet Black/Ck Ash</span>
              <span>Stock Number:</span>
              <span>A16347</span> */}
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

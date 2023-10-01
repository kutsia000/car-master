import React from 'react';
import styles from './AppCarInner.module.scss';
import AppImage from '../AppImage/AppImage';
import AppContainer from '../../layout/AppContainer/AppContainer';
import classNames from 'classnames';
import App from '../../App';

export default function AppCarInner({ images }) {
  return (
    <section className={styles.AppCarInner}>
      <AppContainer>
        <div className={styles.AppCarInner__wrapper}>
          <div className={styles.AppCarInner__images}>
            <figure>
              <AppImage src={images.first} />
            </figure>
            <figure>
              <AppImage src={images.second} />
            </figure>
            <figure>
              <AppImage src={images.third} />
            </figure>
            <figure>
              <AppImage src={images.fourth} />
            </figure>
          </div>
          <div className={styles.AppCarInner__details}>
            <h3 className={styles['AppCarInner__details--title']}>2021 Porsche Panamera</h3>
            <div className={styles['AppCarInner__details--points']}>
              <span>2021</span>
              <span>Porsche</span>
              <span>Panamera</span>
            </div>
            <span className={styles['AppCarInner__details--code']}>კოდი: 33541774</span>
            <div className={styles['AppCarInner__details--price']}>$41,085.00</div>
            <div className={styles['AppCarInner__details--additional']}>დამატებითი ინფორმაცია</div>
            <div className={[styles['AppCarInner__details--info']]}>
              <span>წელი:</span>
              <span>2021</span>
              <span>მწარმოებელი:</span>
              <span>Porsche</span>
              <span>მოდელი:</span>
              <span>Panamera</span>
              <span>Body Style:</span>
              <span>Truck</span>
              <span>მდგომარეობა:</span>
              <span>Certified</span>
              <span>გარბენი:</span>
              <span>3</span>
              <span>ტრანსმისია:</span>
              <span>Automatic 6-speed</span>
              <span>ძრავი:</span>
              <span>6</span>
              <span>Exterior Color:</span>
              <span>Silver Ice Metallic</span>
              <span>Interior Color:</span>
              <span>Jet Black/Ck Ash</span>
              <span>Stock Number:</span>
              <span>A16347</span>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

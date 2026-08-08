import React, { Children } from 'react';
import styles from './AppServiceCard.module.scss';
import AppImage from '../AppImage/AppImage';

export default function AppServiceCard({ src, title, subtitle }) {
  return (
    <div className={styles.AppServiceCard}>
      <figure className={styles.AppServiceCard__icon}>
        <AppImage src={src}/>
      </figure>
      <div className={styles.AppServiceCard__desc}>
        <span className={styles.AppServiceCard__title}>{title}</span>
        <span className={styles.AppServiceCard__subtitle}>{subtitle}</span>
      </div>
    </div>
  );
}

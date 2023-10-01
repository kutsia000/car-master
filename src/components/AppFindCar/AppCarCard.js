import React from 'react';
import styles from './AppCarCard.module.scss';
import AppImage from '../AppImage/AppImage';
import AppLink from '../AppLink';

export default function AppCarCard({ src, model, price }) {
  return (
    <div className={styles.AppCarCard}>
      <figure className={styles.AppCarCard__figure}>
        <AppLink>
          <AppImage src={src} />
        </AppLink>
      </figure>
      <div className={styles.AppCarCard__details}>
        <div className={styles.AppCarCard__link}>
          <AppLink>
            <span className={styles.AppCarCard__model}>{model}</span>
          </AppLink>
        </div>
        <span className={styles.AppCarCard__price}>{price}</span>
      </div>
    </div>
  );
}

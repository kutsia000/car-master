import React from 'react';
import styles from './AppHeroFigure.module.scss';
import AppImage from '../AppImage/AppImage';

export default function AppHeroFigure({src}) {
  return (
    <section className={styles.AppHero}>
      <figure className={styles.AppHero__figure}>
        <AppImage src={src} />
      </figure>
    </section>
  );
}

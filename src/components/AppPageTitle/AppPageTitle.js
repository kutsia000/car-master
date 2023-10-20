import React from 'react';
import styles from './AppPageTitle.module.scss';
import AppImage from '../AppImage/AppImage';

export default function AppPageTitle({ title }) {
  return (
    <section className={styles.AppPageTitle}>
      <figure>
        <AppImage src="/images/page-title.jpg" />
      </figure>
      <div className={styles.AppPageTitle__container}>
        <h3>{title}</h3>
      </div>
    </section>
  );
}

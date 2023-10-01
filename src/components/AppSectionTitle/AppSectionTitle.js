import React from 'react';
import styles from './AppSectionTitle.module.scss';

export default function AppSectionTitle({ title, subtitle }) {
  return (
    <div className={styles.AppSectionTitle}>
      <h3 className={styles.AppSectionTitle__heading}>{title}</h3>
      <span className={styles.AppSectionTitle__desc}>{subtitle}</span>
    </div>
  );
}

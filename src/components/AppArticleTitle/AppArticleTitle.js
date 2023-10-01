import React from 'react';
import styles from './AppArticleTitle.module.scss';

export default function AppArticleTitle({ title, description }) {
  return (
    <div className={styles.AppArticleTitle}>
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  );
}

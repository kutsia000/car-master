import React from 'react';
import styles from './AppRelatedBlogCard.module.scss';
import AppImage from '../AppImage/AppImage';
import AppDate from './AppDate';
import AppLink from '../AppLink';

export default function AppRelatedBlogCard({ src, date, title }) {
  return (
    <article className={styles.AppRelatedBlogCard}>
      <figure>
        <AppLink>
          <AppImage src={src} />
        </AppLink>
      </figure>
      <div className={styles.AppRelatedBlogCard__details}>
        <AppDate date={date} />
        <AppLink>
          <span className={styles.AppRelatedBlogCard__title}>{title}</span>
        </AppLink>
      </div>
    </article>
  );
}

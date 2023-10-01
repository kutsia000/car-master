import React from 'react';
import styles from './AppBlogCard.module.scss';
import AppLink from '../AppLink';
import AppImage from '../AppImage/AppImage';
import AppDate from '../AppBlogInner/AppDate';

export default function AppBlogCard({ src, date, title, description }) {
  return (
    <article className={styles.AppBlogCard}>
      <figure className={styles.AppBlogCard__figure}>
        <AppLink>
          <AppImage src={src} />
        </AppLink>
      </figure>
      <div className={styles.AppBlogCard__details}>
        <AppDate date={date} />
        <div className={styles.AppBlogCard__link}>
          <AppLink>
            <h3 className={styles.AppBlogCard__title}>{title}</h3>
          </AppLink>
        </div>
        <span className={styles.AppBlogCard__desc}>{description}</span>
      </div>
    </article>
  );
}

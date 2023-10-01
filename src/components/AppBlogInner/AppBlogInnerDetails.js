import React from 'react';
import styles from './AppBlogInnerDetails.module.scss';
import AppImage from '../AppImage/AppImage';
import AppDate from './AppDate';

export default function AppBlogInnerDetails({ title, date, articleTop, articleBottom, images }) {
  return (
    <article className={styles.AppBlogInnerDetails}>
      <h3 className={styles.AppBlogInnerDetails__title}>{title}</h3>
      <AppDate date={date}/>
      <span className={styles.AppBlogInnerDetails__article}>{articleTop}</span>
      <div className={styles.AppBlogInnerDetails__images}>
        <figure>
          <AppImage src={images.first} />
        </figure>
        <figure>
          <AppImage src={images.second} />
        </figure>
        <figure>
          <AppImage src={images.third} />
        </figure>
      </div>
      <span className={styles.AppBlogInnerDetails__article}>{articleBottom}</span>
    </article>
  );
}

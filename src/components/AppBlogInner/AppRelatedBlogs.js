import React from 'react';
import styles from './AppRelatedBlogs.module.scss';
import AppRelatedBlogCard from './AppRelatedBlogCard';

export default function AppRelatedBlogs() {
  return (
    <div className={styles.AppRelatedBlogs}>
      <div className={styles.AppRelatedBlogs__titleWrap}>
        <h3 className={styles.AppRelatedBlogs__title}>მსგავსი სიახლეები</h3>
        <button className={styles.AppRelatedBlogs__button}>ნახე ყველა</button>
      </div>
      <div className={styles.AppRelatedBlogs__cards}>
        <AppRelatedBlogCard
          src="/images/related-blog-1.jpg"
          date="19.01.2023"
          title="2023 წლიდან ყველაავტო მფლობელი ვალდებულია გაიაროს ავტო შემოწმება"
        />
        <AppRelatedBlogCard
          src="/images/related-blog-2.jpg"
          date="19.01.2023"
          title="2023 წლიდან ყველაავტო მფლობელი ვალდებულია გაიაროს ავტო შემოწმება"
        />
        <AppRelatedBlogCard
          src="/images/related-blog-3.jpg"
          date="19.01.2023"
          title="2023 წლიდან ყველაავტო მფლობელი ვალდებულია გაიაროს ავტო შემოწმება"
        />
      </div>
    </div>
  );
}

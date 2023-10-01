import React from 'react';
import styles from './AppBlogInner.module.scss';
import AppHeroFigure from '../AppHero/AppHeroFigure';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppBlogInnerDetails from './AppBlogInnerDetails';
import AppRelatedBlogs from './AppRelatedBlogs';

export default function AppBlogInner() {
  const src = {
    first: '/images/blog-inner-1.jpg',
    second: '/images/blog-inner-2.jpg',
    third: '/images/blog-inner-3.jpg',
  };
  return (
    <section className={styles.AppBlogInner}>
      <AppHeroFigure src="/images/blog-inner.jpg" />
      <AppContainer>
        <div className={styles.AppBlogInner__container}>
          <AppBlogInnerDetails
            images={src}
            title='ავტომობილების იმპორტის წესი იცვლება'
            articleTop="2022 წლის 2 ნოემბერს, კავკასიის ავტოიმპორტმა სოციალური პასუხისმგებლობის ფარგლებში, გლდანის მაჟორიტარ კონსტანტინე ზარნაძესთან და ადგილობრივ მოსახლეობასთან ერთად, გამწვანების მორიგი ღონისძიება გამართა."
            articleBottom="2022 წლის 2 ნოემბერს, კავკასიის ავტოიმპორტმა სოციალური პასუხისმგებლობის ფარგლებში, გლდანის მაჟორიტარ კონსტანტინე ზარნაძესთან და ადგილობრივ მოსახლეობასთან ერთად, გამწვანების მორიგი ღონისძიება გამართა."
            date='19.01.2023'
          />
          <AppRelatedBlogs />
        </div>
      </AppContainer>
    </section>
  );
}

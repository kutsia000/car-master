import React from 'react';
import styles from './AppBlog.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppBlogCard from './AppBlogCard';

export default function AppBlog() {
  return (
    <section className={styles.AppBlog}>
      <AppContainer>
        <AppSectionTitle
          title={'სიახლეები'}
          subtitle={'გაეცანი სიახლეებს რომლებიც საჭირო ინფორმაციას შეიცავს'}
        />
        <div className={styles.AppBlog__cards}>
          <AppBlogCard src="/images/blog-card-1.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
          <AppBlogCard src="/images/blog-card-2.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი 2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
          <AppBlogCard src="/images/blog-card-3.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
          <AppBlogCard src="/images/blog-card-2.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
          <AppBlogCard src="/images/blog-card-1.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
          <AppBlogCard src="/images/blog-card-3.jpg" title="ავტომობილების იმპორტის წესი იცვლება" date='19.01.2023' description='2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი'/>
        </div>
      </AppContainer>
    </section>
  );
}

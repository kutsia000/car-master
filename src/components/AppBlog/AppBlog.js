import React, { useContext, useEffect, useState } from 'react';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, createSearchParams, useNavigate } from 'react-router-dom';
import styles from './AppBlog.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppBlogCard from './AppBlogCard';
import AppButton from '../AppButton/AppButton';

export default function AppBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getBlogs, blogs, recordsCount } = useContext(LandingServiceContext);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 6);
  const { t, i18n } = useTranslation();
  //console.log(getReviews);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language || 'en';
  const [params, setParams] = useState({
    id: null,
    languageCode: lang,
    page: page,
    pageSize: pageSize,
  });

  const totalPages = Math.ceil(recordsCount / pageSize);

  const fetchBlogs = async () => {
    await getBlogs(params);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, pageSize]);

  useEffect(() => {
    if (blogs) {
      //console.log(blogs);
    }
  }, [blogs]);

  const handlePreviousPage = () => {
    const tmp = Math.max(page - 1, 1);
    setParams((prevParams) => ({
      ...prevParams,
      page: tmp,
    }));
    handlePageChange(tmp);
  };

  const handleNextPage = () => {
    const tmp = Math.min(page + 1, totalPages);
    setParams((prevParams) => ({
      ...prevParams,
      page: tmp,
    }));
    handlePageChange(tmp);
  };

  const handlePageChange = (event) => {
    setPage(event);
    navigate({
      search: createSearchParams({
        page: event,
      }).toString(),
    });
  };

  const truncateText = (text, maxLength) => {
    maxLength = maxLength || 150;
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + '...';
    }
  };

  return (
    <section className={styles.AppBlog}>
      <AppContainer>
        <AppSectionTitle
          title={'სიახლეები'}
          subtitle={'გაეცანი სიახლეებს რომლებიც საჭირო ინფორმაციას შეიცავს'}
        />
        <div className={styles.AppBlog__cards}>
          {blogs &&
            blogs.map((blog) => {
              return (
                <AppBlogCard
                  key={blog.blogContents[0].id}
                  src="/images/blog-card-1.jpg"
                  title={blog.blogContents[0].title}
                  date="19.01.2023"
                  description={truncateText(blog.blogContents[0].content, 150)}
                  href={`/${lang}/blogs/${blog.blogContents[0].blogId}`}
                />
              );
            })}
          {/* <AppBlogCard
            src="/images/blog-card-1.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          />
          <AppBlogCard
            src="/images/blog-card-2.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი 2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          />
          <AppBlogCard
            src="/images/blog-card-3.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          />
          <AppBlogCard
            src="/images/blog-card-2.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          />
          <AppBlogCard
            src="/images/blog-card-1.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          />
          <AppBlogCard
            src="/images/blog-card-3.jpg"
            title="ავტომობილების იმპორტის წესი იცვლება"
            date="19.01.2023"
            description="2023 წლიდან მოქმედებაში შედის ახალი კანონი რომლის თანახმადაც გრძელი ტექსტის შემთხვევაში სამი წერტილის მაგალითი"
          /> */}
        </div>
        <AppButton onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </AppButton>
        {/* <span>{page}</span> */}
        <AppButton onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </AppButton>
      </AppContainer>
    </section>
  );
}

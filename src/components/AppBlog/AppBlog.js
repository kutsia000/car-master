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
        {/* <span>{page}</span> */}

        <div className={styles.AppBlog__arrows}>
          <AppButton iconButton onClick={handlePreviousPage} disabled={page === 1}>
            <LeftArrow />
          </AppButton>
          <AppButton iconButton onClick={handleNextPage} disabled={page === totalPages}>
            <RightArrow />
          </AppButton>
        </div>
      </AppContainer>
    </section>
  );
}

const LeftArrow = () => {
  return (
    <svg
      fill="#db2d2e"
      height="30"
      width="30"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
    >
      <path
        id="XMLID_6_"
        d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
   c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
   c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
   c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"
      />
    </svg>
  );
};

const RightArrow = () => {
  return (
    <svg
      fill="#db2d2e"
      height="30"
      width="30"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          id="XMLID_2_"
          d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605 l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396 l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998 c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"
        ></path>{' '}
      </g>
    </svg>
  );
};

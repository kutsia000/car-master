import React from 'react';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import AppBlog from '../../components/AppBlog/AppBlog';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../Header/AppHeader';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../../containers/Footer/AppFooter';

const LandingBlogs = () => {
  // if (loading) {
  //   return <LoadingMarkUp />;
  // }

  return (
    <>
      <AxiosInterceptor>
        <LandingService>
          <AppInfoHeader />
          <AppHeader />
          <AppBlog />
          <MapDrawer />
          <AppFooter />
        </LandingService>
      </AxiosInterceptor>
      {/* {blogs &&
        blogs.map((blog) => {
          return (
            <div key={blog.blogContents[0].id}>
              <Link to={`/${lang}/blogs/${blog.blogContents[0].blogId}`}>more</Link>
              <h3>{blog.blogContents[0].title}</h3>
              <div>{truncateText(blog.blogContents[0].content, 150)}</div>
            </div>
          );
        })}
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span>{page}</span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button> */}
    </>
  );
};

export default LandingBlogs;

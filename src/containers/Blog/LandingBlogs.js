import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link, useLocation, createSearchParams, useNavigate } from 'react-router-dom';

const LandingBlogs = () => {
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

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      {blogs &&
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
      </button>
    </>
  );
};

export default LandingBlogs;

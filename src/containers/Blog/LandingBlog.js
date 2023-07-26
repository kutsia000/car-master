import React, { useContext, useEffect, useState } from 'react';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

const LandingBlog = () => {
  const { getBlogById, error, blog } = useContext(LandingServiceContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  const lang = i18n.language || 'en';
  const [params, setParams] = useState({
    id: blogId,
    languageCode: lang,
  });

  const fetchBlog = async () => {
    if (blogId) {
      await getBlogById(params);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  // useEffect(() => {
  //   if (blog) {
  //     console.log(blog);
  //   }
  // }, [blog]);

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      {blog && (
        <div>
          <h2>{blog.blogContents[0].title}</h2>
          <label>{blog.blogContents[0].content}</label>
        </div>
      )}
    </>
  );
};

export default LandingBlog;

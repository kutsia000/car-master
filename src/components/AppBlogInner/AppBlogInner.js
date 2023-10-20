import React, { useContext, useState, useEffect } from 'react';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AppBlogInner.module.scss';
import AppHeroFigure from '../AppHero/AppHeroFigure';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppBlogInnerDetails from './AppBlogInnerDetails';
import AppRelatedBlogs from './AppRelatedBlogs';
import LoadingMarkUp from '../Loading/Loading';

export default function AppBlogInner() {
  const { getBlogById, error, blog } = useContext(LandingServiceContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState(null);
  const [appTop, setAppTop] = useState('');
  const [appBottom, setAppBottom] = useState('');
  const { blogId } = useParams();
  const lang = i18n.language || 'en';
  const [params, setParams] = useState({
    id: blogId,
    languageCode: lang,
  });

  const mainUrl = 'https://cl1ne.ge';

  const fetchBlog = async () => {
    if (blogId) {
      await getBlogById(params);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    if (blog) {
      if (blog.imageURLs) {
        var urls = blog.imageURLs.map((b) => {
          return mainUrl + b;
        });

        setImageUrls(urls);
      }
      splitStringIntoFirst50Words(blog.blogContents[0].content);
    }
  }, [blog]);

  function splitStringIntoFirst50Words(inputString) {
    // Use a regular expression to split the string into an array of words
    const words = inputString.split(/\s+/);

    // Extract the first 50 words
    const first50Words = words.slice(0, 50);

    // Extract the remaining words
    const remainingWords = words.slice(50);

    setAppTop(first50Words);
    setAppBottom(remainingWords);
  }

  if (loading) {
    return <LoadingMarkUp />;
  }

  const src = {
    first: '/images/blog-inner-1.jpg',
    second: '/images/blog-inner-2.jpg',
    third: '/images/blog-inner-3.jpg',
  };

  return (
    <section className={styles.AppBlogInner}>
      <div style={{height: 380}}>
        <AppHeroFigure src={blog && mainUrl + blog.mainImageUrl} />
      </div>
      <AppContainer>
        <div className={styles.AppBlogInner__container}>
          {blog && (
            <AppBlogInnerDetails
              images={imageUrls ? imageUrls : []}
              title={blog.blogContents[0].title}
              articleTop={appTop}
              articleBottom={appBottom}
              date="19.01.2023"
            />
          )}
          <AppRelatedBlogs />
        </div>
      </AppContainer>
    </section>
  );
}

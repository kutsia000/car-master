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

  useEffect(() => {
    if (blog) {
      //console.log(blog);
    }
  }, [blog]);

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
      <AppHeroFigure src="/images/blog-inner.jpg" />
      <AppContainer>
        <div className={styles.AppBlogInner__container}>
          <AppBlogInnerDetails
            images={src}
            title="ავტომობილების იმპორტის წესი იცვლება"
            articleTop="2022 წლის 2 ნოემბერს, კავკასიის ავტოიმპორტმა სოციალური პასუხისმგებლობის ფარგლებში, გლდანის მაჟორიტარ კონსტანტინე ზარნაძესთან და ადგილობრივ მოსახლეობასთან ერთად, გამწვანების მორიგი ღონისძიება გამართა."
            articleBottom="2022 წლის 2 ნოემბერს, კავკასიის ავტოიმპორტმა სოციალური პასუხისმგებლობის ფარგლებში, გლდანის მაჟორიტარ კონსტანტინე ზარნაძესთან და ადგილობრივ მოსახლეობასთან ერთად, გამწვანების მორიგი ღონისძიება გამართა."
            date="19.01.2023"
          />
          <AppRelatedBlogs />
        </div>
      </AppContainer>
    </section>
  );
}

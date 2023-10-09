import React from 'react';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import AppInfoHeader from '../../components/AppInfoHeader/AppInfoHeader';
import AppHeader from '../Header/AppHeader';
import MapDrawer from '../../components/MapDrawers/MapDrawer';
import AppFooter from '../../containers/Footer/AppFooter';
import AppBlogInner from '../../components/AppBlogInner/AppBlogInner';

const LandingBlog = () => {
  // const { getBlogById, error, blog } = useContext(LandingServiceContext);
  // const navigate = useNavigate();
  // const { t, i18n } = useTranslation();
  // const [loading, setLoading] = useState(true);
  // const { blogId } = useParams();
  // const lang = i18n.language || 'en';
  // const [params, setParams] = useState({
  //   id: blogId,
  //   languageCode: lang,
  // });

  // const fetchBlog = async () => {
  //   if (blogId) {
  //     await getBlogById(params);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBlog();
  // }, []);

  // useEffect(() => {
  //   if (blog) {
  //     console.log(blog);
  //   }
  // }, [blog]);

  // if (loading) {
  //   return <LoadingMarkUp />;
  // }

  return (
    <>
      <AxiosInterceptor>
        <LandingService>
          <AppInfoHeader />
          <AppHeader />
          <AppBlogInner />
          <MapDrawer />
          <AppFooter />
        </LandingService>
      </AxiosInterceptor>
      {/* {blog && (
        <div>
          <h2>{blog.blogContents[0].title}</h2>
          <label>{blog.blogContents[0].content}</label>
        </div>
      )} */}
    </>
  );
};

export default LandingBlog;

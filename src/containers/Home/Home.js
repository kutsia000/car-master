import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';
import Landing from '../../pages/Landing/Landing';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';

const Home = () => {
  const { t, i18n } = useTranslation();
  // const location = useLocation();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const lang = i18n.language || 'en';
  const [params, setParams] = useState({
    id: null,
    languageCode: lang,
    page: null,
    pageSize: null,
  });

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <AxiosInterceptor>
      <LandingService>
        <Landing />
      </LandingService>
    </AxiosInterceptor>
  );
};

export default Home;

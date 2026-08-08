import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingMarkUp from '../../components/Loading/Loading';
import Landing from '../../pages/Landing/Landing';
import { AxiosInterceptor } from '../../services/AxiosInterceptor';
import { LandingService } from '../../services/LandingServices/LandingService';
import MessengerCustomerChat from 'react-messenger-customer-chat';

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
        <MessengerCustomerChat pageId="101834517907650" appId="1009391686895434" />
      </LandingService>
    </AxiosInterceptor>
  );
};

export default Home;

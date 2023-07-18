import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import NotificationDialog from '../Notification/NotificationDialog';
import LoadingMarkUp from '../../components/Loading/Loading';

const DealerDashboard = () => {
  const { getDealerHome, notifications, error } = useContext(DealerServiceContext);
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //await getDealerHome();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <NotificationDialog notifications={notifications} />
      delaer dashboard
    </>
  );
};
export default DealerDashboard;

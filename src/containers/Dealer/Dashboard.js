import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import NotificationDialog from '../Notification/NotificationDialog';
import LoadingMarkUp from '../../components/Loading/Loading';

const DealerDashboard = () => {
  const { getDealerHome, notifications, agreeNotification, error, success } =
    useContext(DealerServiceContext);
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await getDealerHome();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNotificationAgree = async () => {
    //console.log(notifications[0]);
    if (notifications) {
      if (notifications[0]) {
        await agreeNotification(notifications[0].id);
        fetchData();
      }
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      {notifications && (
        <NotificationDialog notification={notifications[0]} handleAgree={handleNotificationAgree} />
      )}
      delaer dashboard
    </>
  );
};
export default DealerDashboard;

import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import LoadingMarkUp from '../../components/Loading/Loading';
import NotificationDialog from '../../containers/Notification/NotificationDialog';
import { useTranslation } from 'react-i18next';

export default function DealerHomePage() {
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
      <div className="dealer-layout">
        <Outlet />
      </div>
    </>
  );
}

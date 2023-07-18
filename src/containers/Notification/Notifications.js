import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Notifications = () => {
  const { getNotifications, notifications, error } = useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const lang = i18n.language || 'en';

  const fetchNotifications = async () => {
    await getNotifications();
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <LoadingMarkUp />;
  }
  return (
    <>
      <Link to={`/${lang}/admin/dashboard/notification/`}>{t('new')}</Link>
      {notifications &&
        notifications.map((notification) => {
          return (
            <div key={notification.id}>
              <Link to={`/${lang}/admin/dashboard/notification/${notification.id}`}>edit</Link>
              <h2>{notification.title}</h2>
              <p>{notification.content}</p>
            </div>
          );
        })}
    </>
  );
};

export default Notifications;

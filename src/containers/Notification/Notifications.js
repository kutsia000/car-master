import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Dialog from '../../components/Dialog/Dialog';
import Notification from './Notification';
import { Link, useLocation, createSearchParams, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';

const Notifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { getNotifications, notifications, deleteNotification, recordsCount } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState(parseInt(queryParams.get('pageSize')) || 5);
  const lang = i18n.language || 'en';
  const [isOpen, setIsOpen] = useState(false);
  const { notificationId } = useParams();

  const fetchNotifications = async () => {
    const langModel = {
      id: -1,
      languageCode: lang,
      page: page,
      pageSize: pageSize,
    };
    await getNotifications(langModel);
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  useEffect(() => {
    fetchNotifications();
  }, [page, pageSize]);

  useEffect(() => {
    if (notificationId) {
      handleOpenDialog();
    }
  }, [notificationId]);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    navigate(`/${lang}/admin/dashboard/notifications`);
    fetchNotifications();
  };

  const handlePageChange = (event) => {
    setPage(event);
    navigate({
      search: createSearchParams({
        page: event,
      }).toString(),
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('are you sure?')) {
      await deleteNotification(id);
      fetchNotifications();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }
  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');
  
  if (isOpen) { 
    return (
    <Dialog onClose={handleCloseDialog}>
      <Notification handleCloseDialog={handleCloseDialog} />
    </Dialog>
    )
  }

  return (
    <>
      {/* <Link to={`/${lang}/admin/dashboard/notification/`}>{t('new')}</Link> */}
      <div className='new-button'>
      <AppButton large label={'new'} onClick={handleOpenDialog} color={'#0c2d57'} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {notifications &&
              notifications.map((notification) => {
                return (
                  <tr key={notification.id}>
                    <td>{notification.id}</td>
                    <td>{notification.title}</td>
                    <td>{notification.content}</td>
                    <td>
                      <Link to={`/${lang}/admin/dashboard/notifications/${notification.id}`}>
                        edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(notification.id)}>delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <PaginationControl
          page={page}
          between={3}
          total={recordsCount}
          limit={pageSize}
          changePage={(page) => handlePageChange(page)}
          ellipsis={2}
        />
      </div>
      {/* {notifications &&
        notifications.map((notification) => {
          return (
            <div key={notification.id}>
              <Link to={`/${lang}/admin/dashboard/notifications/${notification.id}`}>edit</Link>
              <h2>{notification.title}</h2>
              <p>{notification.content}</p>
            </div>
          );
        })} */}
    </>
  );
};

export default Notifications;

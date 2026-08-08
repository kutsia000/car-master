import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';
import InputComponent from '../../components/Input/InputComponent';
import AppButton from '../../components/AppButton/AppButton';

const Notification = ({ handleCloseDialog }) => {
  const { getNotificationById, notification, addNotification, updateNotification, error, success } =
    useContext(AdminServiceContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    content: '',
  });
  const lang = i18n.language || 'en';
  const { notificationId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getNotificationById(notificationId);
      setLoading(false);
    };

    if (notificationId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    //console.log(notification);
    if (notification) {
      if (!notificationId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: null,
          title: '',
          content: '',
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          id: notification.id,
          title: notification.title,
          content: notification.content,
        }));
      }
    }
  }, [notification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (notificationId) {
      await updateNotification(formData);
    } else {
      await addNotification(formData);
    }

    setLoading(false);

    if (success) {
      handleCloseDialog();
    }
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <h2 style={{ paddingBottom: 20 }}>notificationId: {notificationId}</h2>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label={t('title')}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange(e)}
        />
        <InputComponent
          label={t('content')}
          type="text"
          id="content"
          name="content"
          value={formData.content}
          onChange={(e) => handleInputChange(e)}
        />
        {error ? error : null}
        <AppButton type={'submit'} label={'submit'} full />
      </form>
    </>
  );
};

export default Notification;

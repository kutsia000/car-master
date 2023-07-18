import React, { useContext, useEffect, useState } from 'react';
import { DealerServiceContext } from '../../services/Dealer/DealerService';
import '../../Main.css';

const NotificationDialog = ({ notifications }) => {
  const { agreeNotification, error } = useContext(DealerServiceContext);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notifications) {
      setIsOpen(true);
      setCurrentNotification(notifications[0]);
    } else {
      setIsOpen(false);
    }
  }, [notifications]);

  const handleAgree = async () => {
    if (currentNotification) {
      await agreeNotification({ notificationId: currentNotification.id });
      const remainingNotifications = notifications.slice(1);
      setCurrentNotification(remainingNotifications(remainingNotifications[0]));
    }
  };
  return (
    <>
      {isOpen && (
        <dialog open>
          <h2>{currentNotification.Title}</h2>
          <p>{currentNotification.Content}</p>
        </dialog>
      )}
    </>
  );
};

export default NotificationDialog;

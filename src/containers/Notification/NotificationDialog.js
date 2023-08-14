import React, { useEffect, useState } from 'react';
import '../../Main.css';

const NotificationDialog = ({ notification, handleAgree }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [notification]);

  const handleNotifAgree = async () => {
    if (notification) {
      handleAgree();
    }
  };

  return (
    <>
      {isOpen && notification && (
        <div className="dialog-container">
          <dialog open>
            <h2>{notification.title}</h2>
            <p>{notification.content}</p>
            <button type="button" onClick={() => handleNotifAgree()}>
              agree
            </button>
          </dialog>
        </div>
      )}
    </>
  );
};

export default NotificationDialog;

import React, { useEffect, useState } from 'react';
import '../../Main.css';
import styles from '../../components/Dialog/Dialog.module.scss';
import AppButton from '../../components/AppButton/AppButton';

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

  isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');

  return (
    <>
      {isOpen && notification && (
        <div className={styles.Dialog} style={{top: 0, left: 0}} open>
          <div className={styles.Dialog__content}>
            <div>
              <h2>{notification.title}</h2>
              <p>{notification.content}</p>
              <AppButton type={'button'} large label={'agree'} onClick={() => handleNotifAgree()}/>
            </div>
          </div>
        </div>
        // <div className="dialog-container">
        //   <dialog open>
        //     <h2>{notification.title}</h2>
        //     <p>{notification.content}</p>
        //     <button type="button" onClick={() => handleNotifAgree()}>
        //       agree
        //     </button>
        //   </dialog>
        // </div>
      )}
    </>
  );
};

export default NotificationDialog;

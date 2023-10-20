import React from 'react';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import styles from './Dialog.module.scss';

const Dialog = ({ onClose, children }) => {
  return (
    <div className={styles.Dialog} open onClose={onClose}>
      <div className={styles.Dialog__content}>
        <div>{children}</div>
      </div>
      <div className={styles['Dialog--close']} onClick={onClose}>
        <figure style={{ cursor: 'pointer', width: 'fit-content', margin: 0 }}>
          <CloseIcon />
        </figure>
      </div>
    </div>
  );
};

export default Dialog;

const CloseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 384 512" fill="#ffffff">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );
};

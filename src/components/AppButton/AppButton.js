import React from 'react';
import styles from './AppButton.module.scss';
import classNames from 'classnames';

const AppButton = ({
  label,
  type,
  onClick,
  transparent,
  loading,
  leftIcon,
  rightIcon,
  large,
  full,
  children,
  iconButton
}) => {
  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <button
      className={classNames(styles.AppButton, {
        [styles['AppButton--transparent']]: transparent,
        [styles['AppButton--left']]: leftIcon,
        [styles['AppButton--right']]: rightIcon,
        [styles['AppButton--large']]: large,
        [styles['AppButton--full']]: full,
        [styles['AppButton--icon']]: iconButton,
      })}
      type={type}
      onClick={handleClick}
      disabled={loading}
    >
      <span className={styles.AppButton__title}>{label}</span>
      {children}
    </button>
  );
};

export default AppButton;

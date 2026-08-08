import React from 'react';
import LogOut from '../../../containers/Header/Subcomponents/LogOut/LogOut';
import AppImage from '../../AppImage/AppImage';
import styles from './AppAdminHeader.module.scss';

export default function AppAdminHeader() {
  return (
    <header className={styles.AppAdminHeader}>
      <figure>
        <AppImage src={'/images/logo.svg'} />
      </figure>
      <LogOut />
    </header>
  );
}

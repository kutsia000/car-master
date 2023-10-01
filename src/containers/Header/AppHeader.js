import React from 'react';
import styles from './AppHeader.module.scss';
import Navigation from './Subcomponents/Navigation/Navigation';
import AppContainer from '../../layout/AppContainer/AppContainer';

export default function AppHeader() {
  return (
    <header className={styles.AppHeader}>
      <AppContainer>
        <Navigation header={true}/>
      </AppContainer>
    </header>
  );
}

import React, { useState } from 'react';
import styles from './AppHeaderMobileNavigation.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from './Subcomponents/LanguageSelector/LanguageSelector';
import AppImage from '../../components/AppImage/AppImage';
import AppButton from '../../components/AppButton/AppButton';
import AppHeaderMobileMenu from './AppHeaderMobileMenu';

const AppHeaderMobileNavigation = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const burgerHandler = () => {
    setBurgerOpen(!burgerOpen);
  };
  const closeHandler = () => {
    setBurgerOpen(!burgerOpen);
  };
  burgerOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = '');
  return (
    <nav className={styles.MobileNavigation}>
      <ul className={styles.MobileNavigation__list}>
        <li>
          <Link to={`/${lang}`}>
            <AppImage src={'/images/logo.svg'} />
          </Link>
        </li>
        {burgerOpen && <AppHeaderMobileMenu closeHandler={closeHandler} />}
      </ul>
      <div className={styles.MobileNavigation__right}>
        <Link to={`/${lang}/login`}>
          <UserIcon />
        </Link>
        <AppButton iconButton>
          <LanguageSelector />
        </AppButton>
        <div className={styles.MobileNavigation__burger} onClick={burgerHandler}>
          <figure>
            <BurgerIcon />
          </figure>
        </div>
      </div>
    </nav>
  );
};

export default AppHeaderMobileNavigation;

const BurgerIcon = () => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.75 16.2436H1.25C0.56 16.2436 0 15.6836 0 14.9936C0 14.3036 0.56 13.7436 1.25 13.7436H28.75C29.44 13.7436 30 14.3036 30 14.9936C30 15.6836 29.44 16.2436 28.75 16.2436ZM28.75 6.66016H1.25C0.56 6.66016 0 6.10016 0 5.41016C0 4.72016 0.56 4.16016 1.25 4.16016H28.75C29.44 4.16016 30 4.72016 30 5.41016C30 6.10016 29.44 6.66016 28.75 6.66016ZM28.75 25.8267H1.25C0.56 25.8267 0 25.2667 0 24.5767C0 23.8867 0.56 23.3267 1.25 23.3267H28.75C29.44 23.3267 30 23.8867 30 24.5767C30 25.2667 29.44 25.8267 28.75 25.8267Z"
        fill="white"
      />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512" fill="#ffffff">
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
    </svg>
  );
};

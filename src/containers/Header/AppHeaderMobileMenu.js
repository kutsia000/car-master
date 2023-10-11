import React from 'react';
import styles from './AppHeaderMobileMenu.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AppHeaderMobileMenu({closeHandler}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return (
    <div className={styles.AppHeaderMobileMenu}>
      <div className={styles.AppHeaderMobileMenu__close} onClick={closeHandler}>
        <CloseIcon />
      </div>
      <ul>
        <li>
          <Link to={`/${lang}`}>{t('navigation_home')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/about`}>{t('navigation_about')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/services`}>{t('navigation_services')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/blogs`}>{t('navigation_blogs')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/contact`}>{t('navigation_contact')}</Link>
        </li>
      </ul>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <svg width="35" height="35" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

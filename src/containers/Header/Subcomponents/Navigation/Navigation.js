import React from 'react';
import styles from './Navigation.module.scss';
//import LanguageContext from '../../../../utils/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import AppImage from '../../../../components/AppImage/AppImage';
import AppButton from '../../../../components/AppButton/AppButton';
import classNames from 'classnames';

const Navigation = ({ header, footer }) => {
  // const { language, changeLanguage } = useContext(LanguageContext);
  // const translations = require(`../../../../data/languages/${language}.json`);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return (
    <nav className={classNames(styles.AppMenuList, { [styles['AppMenuList--vertical']]: footer })}>
      <ul className={styles.AppMenuList__left}>
        {header && (
          <li>
            <Link to={`/${lang}`}>
              <AppImage src={'/images/logo.svg'} />
            </Link>
          </li>
        )}
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
        {header && (
          <li>
            <Link to={`/${lang}/becomedealer`}>{t('navigation_becomedealer')}</Link>
          </li>
        )}
        <li>
          <Link to={`/${lang}/contact`}>{t('navigation_contact')}</Link>
        </li>
      </ul>
      {header && (
        <div className={styles.AppMenuList__right}>
          <Link to={`/${lang}/login`}>
            <UserIcon />
          </Link>
          <AppButton iconButton>
            <LanguageSelector />
          </AppButton>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 448 512" fill="#ffffff">
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
    </svg>
  );
};

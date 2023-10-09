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
          <AppButton iconButton>
            <LanguageSelector />
          </AppButton>
          <Link to={`/${lang}/login`}>login</Link>
        </div>
      )}
    </nav>
  );
};

const SearchIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.8333 22.1667C17.988 22.1667 22.1667 17.988 22.1667 12.8333C22.1667 7.67868 17.988 3.5 12.8333 3.5C7.67868 3.5 3.5 7.67868 3.5 12.8333C3.5 17.988 7.67868 22.1667 12.8333 22.1667Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.4998 24.5L19.4248 19.425"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Navigation;

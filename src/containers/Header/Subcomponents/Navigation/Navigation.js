import React from 'react';
//import LanguageContext from '../../../../utils/LanguageContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { Link } from 'react-router-dom';

const Navigation = () => {
  // const { language, changeLanguage } = useContext(LanguageContext);
  // const translations = require(`../../../../data/languages/${language}.json`);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/${lang}`}>{t('navigation_home')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/about`}>{t('navigation_about')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/contact`}>{t('navigation_contact')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/blogs`}>{t('navigation_blogs')}</Link>
        </li>
        <li>
          <Link to={`/${lang}/becomedealer`}>{t('navigation_becomedealer')}</Link>
        </li>
      </ul>
      <Link to={`/${lang}/login`}>login</Link>
      <LanguageSelector />
    </nav>
  );
};

export default Navigation;

import React, { useContext } from 'react';
import LanguageContext from '../../../../utils/LanguageContext';
import {useTranslation} from 'react-i18next';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Navigation = () => {
  // const { language, changeLanguage } = useContext(LanguageContext);
  // const translations = require(`../../../../data/languages/${language}.json`);
  const {t} = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <a href="/">{t('landing.home')}</a>
        </li>
        <li>
          <a href="/about">{t('landing.about')}</a>
        </li>
        <li>
          <a href="/contact">{t('landing.compact')}</a>
        </li>
      </ul>
      <LanguageSelector/>
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ka')}>Georgian</button> */}
    </nav>
  );
};

export default Navigation;

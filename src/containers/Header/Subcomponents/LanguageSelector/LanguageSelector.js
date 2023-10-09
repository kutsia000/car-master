import React, { useEffect, useState } from 'react';
import styles from './LanguageSelector.module.scss';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AppImage from '../../../../components/AppImage/AppImage';

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ka',
    name: 'ქართული',
    country_code: 'ge',
  },
];

const LanguageSelector = () => {
  const currentLanguageCode = Cookies.get('i18next') || 'ka';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLanguageChange = (code) => {
    if (code !== currentLanguage) {
      i18next.changeLanguage(code);
      const newPath = window.location.pathname.replace(`/${currentLanguageCode}`, `/${code}`);
      navigate(`${newPath}`);
    }
  };

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('app_title');
  }, [currentLanguage, t]);

  return (
    <div className={styles.AppHeaderLanguage__Wrapper}>
      <div
        className={classNames(styles.AppHeaderLanguage, {
          [styles['AppHeaderLanguage--Hovered']]: hovered,
        })}
        onMouseEnter={(e) => {
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 15}px`;
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.setAttribute('style', '');
          setHovered(false);
        }}
      >
        <ul>
          {languages.map(({ code, country_code }) => (
            <li key={country_code}>
              <a
                key={country_code}
                onClick={(e) => {
                  e.preventDefault();
                  handleLanguageChange(code);
                }}
                href={code}
              >
                <AppImage src={`/images/language-${code}.svg`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;

import {i18n} from '../../../../utils/i18n';
import {useTranslation} from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
        const currentPath = window.location.pathname;
        const newPath = `/${lng}${currentPath.substr(3)}`;
    
        i18n.changeLanguage(lng);
        window.history.pushState(null, '', newPath);
      };
  
    return (
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ka')}>Georgian</button>
        {/* <button onClick={() => changeLanguage('es')}>Español</button> */}
      </div>
    );
  };

export default LanguageSelector;
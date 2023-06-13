import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const handleUnauthorizedError = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  Cookies.remove('Token');
  localStorage.removeItem('IsAdmin');

  navigate(`/${lang}/login`);
};

export default handleUnauthorizedError;

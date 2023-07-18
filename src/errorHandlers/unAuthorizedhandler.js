import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const handleUnauthorizedError = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  // Handle unauthorized errors
  Cookies.remove('Token');
  localStorage.removeItem('UserTypeId');
  const lang = i18n.language;
  navigate(`/${lang}/login`); // Example: Redirect to the login page

  return;
};

export default handleUnauthorizedError;

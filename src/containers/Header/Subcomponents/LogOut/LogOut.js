import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonComponent from '../../../../components/Button/ButtonComponent';
import { AuthServiceContext } from '../../../../services/AuthService';

const LogOut = () => {
  const { logout } = useContext(AuthServiceContext);
  const { t } = useTranslation();
  //const lang = i18n.language || 'en';

  const handleClick = async () => {
    await logout();
  };

  return (
    <>
      <ButtonComponent label={t('logout')} type="button" onClick={handleClick} />
    </>
  );
};

export default LogOut;

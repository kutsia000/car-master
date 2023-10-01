import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppButton from '../../../../components/AppButton/AppButton';
import { AuthServiceContext } from '../../../../services/AuthService';
//import LoadingMarkUp from '../../../../components/Loading/Loading';

const LogOut = () => {
  const { logout } = useContext(AuthServiceContext);
  const { t } = useTranslation();
  //const lang = i18n.language || 'en';

  const handleClick = async () => {
    await logout();
  };

  return (
    <>
      <AppButton label={t('logout')} type="button" onClick={handleClick} />
    </>
  );
};

export default LogOut;

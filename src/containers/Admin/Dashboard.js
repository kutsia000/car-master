import React, { useContext, useEffect } from 'react';
//import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';

const AdminDashboard = () => {
  const { home } = useContext(AdminServiceContext);
  useEffect(() => {
    const callHome = async () => {
      //console.log(home);
      await home();
      //console.log(['dashboard', response]);
    };

    callHome();
  }, []);

  return <>Home</>;
};

export default AdminDashboard;

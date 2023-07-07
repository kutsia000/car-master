import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';

const AdminDashboard = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const { home } = useContext(AdminServiceContext);
  useEffect(() => {
    const callHome = async () => {
      //console.log(home);
      await home();
      //console.log(['dashboard', response]);
    };

    callHome();
  }, []);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={`/${lang}/admin/dashboard/reviews`}>reviews</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default AdminDashboard;

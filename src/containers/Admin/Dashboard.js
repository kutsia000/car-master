import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';

const AdminDashboard = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const [loading, setLoading] = useState(true);

  const { home } = useContext(AdminServiceContext);
  useEffect(() => {
    const callHome = async () => {
      //console.log(home);
      await home();
      setLoading(false);
      //console.log(['dashboard', response]);
    };

    callHome();
  }, []);

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={`/${lang}/admin/dashboard/reviews`}>reviews</Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/blogs`}>blogs</Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/notifications`}>notification</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default AdminDashboard;

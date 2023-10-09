import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../services/AdminService';
import LoadingMarkUp from '../../components/Loading/Loading';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
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
              <Link to={`/${lang}/admin/dashboard/users`}>
                <span style={{ color: 'black ' }}>users</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/reviews`} style={{ color: 'black !important' }}>
                <span style={{ color: 'black ' }}>reviews</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/blogs`} style={{ color: 'black !important' }}>
                <span style={{ color: 'black ' }}>blogs</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/notifications`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>notifications</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/carmarks`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>carmarks</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/carmodels`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>carmodels</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/dealerrequests`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>dealerrequests</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/auctions`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>auctions</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/locations`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>locations</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/ports`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>ports</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/pricelistgroups`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>pricelistgroups</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/pricelistgrouplines`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>pricelistgrouplines</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/mypricelist`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>mypricelist</span>
              </Link>
            </li>
            <li>
              <Link to={`/${lang}/admin/dashboard/cars`} style={{ color: 'black' }}>
                <span style={{ color: 'black ' }}>cars</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default AdminDashboard;

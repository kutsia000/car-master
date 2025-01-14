import React, { useContext, useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminServiceContext } from '../../../services/AdminService';
import LoadingMarkUp from '../../Loading/Loading';
import { Tooltip } from 'react-tooltip';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  //console.log(AdminServiceContext);
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
      <nav className={styles.AdminDashboard}>
        <ul>
          <li>
            <Link to={`/${lang}/admin/dashboard/profile`}>
              <span className={styles.AdminDashboard__link}>
                <i className="fa-solid fa-user fa-2x" title="Profile"></i>
              </span>
            </Link>
            <Tooltip id="profile1" place="top" effect="solid" content="Profile" />
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/users`}>
              <span className={styles.AdminDashboard__link} style={{ color: 'black ' }}>
                <i className="fa-solid fa-users fa-2x" title="Users"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/cars`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-car fa-2x" title="Cars"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/reviews`} style={{ color: 'black !important' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-comment fa-2x" title="Reviews"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/blogs`} style={{ color: 'black !important' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-blog fa-2x" title="Blogs"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/notifications`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-circle-exclamation fa-2x" title="Notifications"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/carmarks`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-car-side fa-2x" title="CarMarks"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/carmodels`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-car-on fa-2x" title="CarModels"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/dealerrequests`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-envelope fa-2x" title="Dealer Requests"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/auctions`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-paperclip fa-2x" title="Auctions"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/locations`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-location-dot fa-2x" title="Locations"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/ports`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-anchor fa-2x" title="Ports"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/lines`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-ship fa-2x" title="Lines"></i>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/${lang}/admin/dashboard/pricelistgroups`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                <i className="fa-solid fa-layer-group fa-2x" title="PriceList"></i>
              </span>
            </Link>
          </li>
          {/* <li>
            <Link to={`/${lang}/admin/dashboard/pricelistgrouplines`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>pricelistgrouplines</span>
            </Link>
          </li> */}
          <li>
            <Link to={`/${lang}/admin/dashboard/mypricelist`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>
                {' '}
                <i className="fa-solid fa-list-ul fa-2x" title="My Price List"></i>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminDashboard;

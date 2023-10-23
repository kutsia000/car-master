import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EmployeeServiceContext } from '../../services/Employee/EmployeeService';
import LoadingMarkUp from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';
import styles from '../../components/Admin/AppAdminDashboard/Dashboard.module.scss';

const EmployeeDashboard = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return (
    <>
      <nav className={styles.AdminDashboard}>
        <ul>
          <li>
            <Link to={`/${lang}/employee/dashboard/profile`}>
              <span className={styles.AdminDashboard__link} style={{ color: 'black ' }}>
                profile
              </span>
            </Link>
          </li>

          {/* <li>
            <Link to={`/${lang}/dealer/dashboard/mypricelist`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>mypricelist</span>
            </Link>
          </li> */}
          <li>
            <Link to={`/${lang}/employee/dashboard/cars`} style={{ color: 'black' }}>
              <span style={{ color: 'black ' }}>cars</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default EmployeeDashboard;

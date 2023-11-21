import React from 'react';
import styles from './AppInfoHeader.module.scss';
import AppSocials from '../AppSocials/AppSocials';
import AppLink from '../AppLink';
import AppContainer from '../../layout/AppContainer/AppContainer';

export default function AppInfoHeader() {
  return (
    <div className={styles.AppInfoHeader__container}>
      <AppContainer>
        <div className={styles.AppInfoHeader__wrap}>
          <div className={styles.AppInfoHeader__info}>
            <AppLink href={`mailto:info@cline.ge`} className={styles.AppInfoHeader__link}>
              <EmailIcon />
              <span className={styles.AppInfoHeader__icon}>info@cline.ge</span>
            </AppLink>
            <AppLink href={`tel:0322800803`} className={styles.AppInfoHeader__link}>
              <CallIcon />
              <span className={styles.AppInfoHeader__icon}>0 322 800 803</span>
            </AppLink>
            <div className={styles.AppInfoHeader__link}>
              <ClockIcon />
              <span className={styles.AppInfoHeader__icon}>10:00 - 18:00</span>
            </div>
          </div>
          <div className={styles.AppInfoHeader__socials}>
            <AppSocials />
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

function CallIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.64881 9.85429C11.6406 12.8453 12.3193 9.38504 14.2242 11.2886C16.0607 13.1246 17.1162 13.4924 14.7894 15.8185C14.498 16.0528 12.6462 18.8707 6.13845 12.3647C-0.370109 5.858 2.44619 4.00433 2.68048 3.71296C5.0129 1.38038 5.3744 2.44204 7.21087 4.278C9.11577 6.18237 5.65699 6.86331 8.64881 9.85429Z"
        fill="white"
      />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4943 2C14.9918 2 16.875 4.03775 16.875 6.74V11.891C16.875 13.274 16.386 14.5235 15.4972 15.41C14.7 16.2042 13.6658 16.625 12.5063 16.625H5.1165C3.95925 16.625 2.92575 16.205 2.12775 15.41C1.239 14.5235 0.75 13.274 0.75 11.891V6.74C0.75 4.03775 2.63325 2 5.13075 2H12.4943ZM12.4943 3.125H5.13075C3.2445 3.125 1.875 4.64525 1.875 6.74V11.891C1.875 12.9732 2.247 13.94 2.922 14.6127C3.504 15.194 4.26375 15.5 5.11875 15.5H12.4943C12.4958 15.4985 12.5017 15.5 12.5063 15.5C13.362 15.5 14.121 15.194 14.703 14.6127C15.3787 13.94 15.75 12.9732 15.75 11.891V6.74C15.75 4.64525 14.3805 3.125 12.4943 3.125ZM13.6762 6.5966C13.872 6.83735 13.8352 7.19135 13.5945 7.38785L10.2615 10.0969C9.84 10.4313 9.336 10.5986 8.83275 10.5986C8.331 10.5986 7.83075 10.4328 7.41225 10.1013L4.0485 7.38935C3.80625 7.19435 3.76875 6.8396 3.963 6.5981C4.15875 6.35735 4.51275 6.3191 4.75425 6.51335L8.115 9.22235C8.53725 9.55685 9.132 9.55685 9.55725 9.21935L12.8842 6.51485C13.1257 6.3176 13.4797 6.3551 13.6762 6.5966Z"
        fill="white"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C13.1355 2 16.5 5.3645 16.5 9.5C16.5 13.6355 13.1355 17 9 17C4.8645 17 1.5 13.6355 1.5 9.5C1.5 5.3645 4.8645 2 9 2ZM9 3.125C5.48475 3.125 2.625 5.98475 2.625 9.5C2.625 13.0153 5.48475 15.875 9 15.875C12.5153 15.875 15.375 13.0153 15.375 9.5C15.375 5.98475 12.5153 3.125 9 3.125ZM8.7459 5.82155C9.05715 5.82155 9.3084 6.07355 9.3084 6.38405V9.70055L11.8622 11.2231C12.1284 11.3828 12.2162 11.7278 12.0572 11.9948C11.9514 12.1711 11.7647 12.2693 11.5734 12.2693C11.4752 12.2693 11.3762 12.2438 11.2854 12.1906L8.4579 10.5038C8.2884 10.4018 8.1834 10.2181 8.1834 10.0201V6.38405C8.1834 6.07355 8.4354 5.82155 8.7459 5.82155Z"
        fill="white"
      />
    </svg>
  );
}

import React from 'react';
import styles from './AppCustomerCard.module.scss';
import AppImage from '../AppImage/AppImage';

export default function AppCustomerCard({ review, name }) {
  return (
    <article className={styles.AppCustomerCard}>
      <figure style={{width: "48px", height: "48px"}}>
        <MarksIcon />
      </figure>
      <span className={styles.AppCustomerCard__review}>{review}</span>
      <div className={styles.AppCustomerCard__customer}>
        <figure>
          <AppImage src={'/images/customer.jpg'} />
        </figure>
        <h3 className={styles.AppCustomerCard__name}>{name}</h3>
      </div>
    </article>
  );
}

const MarksIcon = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.6452 29.5054C20.6452 27.0968 19.8996 25.0323 18.4086 23.3118C16.9176 21.4767 15.0251 20.2724 12.7312 19.6989C12.9606 18.2079 13.5341 16.6595 14.4516 15.0538C15.4839 13.3333 16.5735 11.957 17.7204 10.9247L14.2796 8C4.75986 14.3082 0 21.4767 0 29.5054C0 32.4875 0.974911 35.0108 2.92473 37.0753C4.98925 39.0251 7.4552 40 10.3226 40C13.19 40 15.5986 38.9677 17.5484 36.9032C19.6129 34.8387 20.6452 32.3728 20.6452 29.5054ZM48 29.5054C48 27.0968 47.2545 25.0323 45.7634 23.3118C44.2724 21.4767 42.3799 20.2724 40.086 19.6989C40.4301 18.0932 41.0609 16.4875 41.9785 14.8817C43.0108 13.276 44.1004 11.957 45.2473 10.9247L41.6344 8C32 14.5376 27.1828 21.7061 27.1828 29.5054C27.1828 32.3728 28.2151 34.8387 30.2796 36.9032C32.3441 38.9677 34.81 40 37.6774 40C40.4301 40 42.8387 38.9677 44.9032 36.9032C46.9678 34.8387 48 32.3728 48 29.5054Z"
        fill="#DB2D2E"
      />
    </svg>
  );
};

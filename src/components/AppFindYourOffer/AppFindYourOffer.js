import React from 'react';
import styles from './AppFindYourOffer.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppSelect from '../AppSelect/AppSelect';
import AppButton from '../AppButton/AppButton';

export default function AppFindYourOffer() {
  return (
    <section className={styles.AppFindYourOffer}>
      <AppContainer>
        <div className={styles.AppFindYourOffer__container}>
          <AppSectionTitle
            title="მოძებნე სასურველი შეთავაზება"
            subtitle="შეიყვანე მონაცამები და იპოვე შენთვის სასურველი ტექნიკა"
          />
          <div className={styles.AppFindYourOffer__selectWrap}>
            <AppSelect placeholder="მწარმოებელი" />
            <AppSelect placeholder="მოდელი" />
            <AppSelect placeholder="ტრანსმისია" />
            <AppSelect placeholder="წელი" />
            <AppSelect placeholder="გარბენი" />
            <AppSelect placeholder="ძრავი" />
          </div>
          <AppButton label="შედეგების ნახვა" large rightIcon>
            <ArrowRight />
          </AppButton>
        </div>
      </AppContainer>
    </section>
  );
}

const ArrowRight = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18.5L15 12.5L9 6.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

import React from 'react';
import styles from './AppCheckCar.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppArticleTitle from '../AppArticleTitle/AppArticleTitle';
import AppInput from '../AppInput/AppInput';
import AppButton from '../AppButton/AppButton';

export default function AppCheckCar() {
  return (
    <section className={styles.AppCheckCar}>
      <AppContainer>
        <div className={styles.AppCheckCar__container}>
          <AppArticleTitle
            title="გაქვს ტექნიკის ნომერი?"
            description="შეიყვანეთ ავტომობილის ნომერი მონაცემების შესამომწებლად"
          />
          <div className={styles.AppCheckCar__search}>
            <AppInput type="text" placeholder="მაგალითად: #23142324" />
            <AppButton label="მოძებნა" leftIcon large>
                <SearchIcon/>
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

const SearchIcon = () => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 18L13.875 14.375"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

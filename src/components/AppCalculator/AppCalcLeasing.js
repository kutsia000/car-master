import React from 'react';
import AppInput from '../AppInput/AppInput';
import AppSelect from '../AppSelect/AppSelect';
import AppButton from '../AppButton/AppButton';
import styles from './AppCalcLeasing.module.scss';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function AppCalcLeasing() {
  return (
    <>
      <form>
        <AppInput
          type="number"
          placeholder="შეიყვანეთ თანხა"
          label="ავტომობილის ღირებულება"
          id="price"
          name="price"
          min={0}
          currency={true}
        />
        <div className={styles.AppCalculator__select}>
          <span className={styles.AppCalculator__label}>ავტომობილის ღირებულება</span>
          <AppSelect options={options} placeholder="აირჩიეთ ლიზინგის ვადა" isClearable={false} />
        </div>
        <AppInput
          type="number"
          placeholder="შეიყვანეთ თანხა"
          label="ავტომობილის ღირებულება"
          id="price"
          name="price"
          min={0}
          currency={true}
        />
        <AppInput
          type="number"
          placeholder="შეიყვანეთ თანხა"
          label="ავტომობილის ღირებულება"
          id="price"
          name="price"
          currency={true}
        />
      </form>
      <AppButton label="გამოთვლა" full />
    </>
  );
}

import React from 'react';
import styles from './AppCalculator.module.scss';
import AppArticleTitle from '../AppArticleTitle/AppArticleTitle';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppButton from '../AppButton/AppButton';
import AppCalcLeasing from './AppCalcLeasing';
import AppCalcCopartPrice from './AppCalcCopartPrice';
import AppCalcIAAIPrice from './AppCalcIAAIPrice';

export default function AppCalculator() {
  return (
    <section className={styles.AppCalculator}>
      <AppContainer>
        <div className={styles.AppCalculator__container}>
          <div className={styles.AppCalculator__wrapper}>
            <AppArticleTitle
              title="გამოთვალე COPART-ის თანხა"
              description="შეიყვანეთ მონაცემები და გამოთვალე მიახლოებითი ხარჯი"
            />
            <AppCalcCopartPrice />
            {/* <AppCalcLeasing /> */}
          </div>
          <div className={styles.AppCalculator__wrapper}>
            <AppArticleTitle
              title="გამოთვალე IAAI-ის თანხა"
              description="შეიყვანეთ მონაცემები და გამოთვალე მიახლოებითი ხარჯი"
            />
            <AppCalcIAAIPrice />
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

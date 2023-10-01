import React from 'react';
import styles from './AppCalculator.module.scss';
import AppArticleTitle from '../AppArticleTitle/AppArticleTitle';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppButton from '../AppButton/AppButton';
import AppCalcLeasing from './AppCalcLeasing';

export default function AppCalculator() {
  return (
    <section className={styles.AppCalculator}>
      <AppContainer>
        <div className={styles.AppCalculator__container}>
          <div className={styles.AppCalculator__wrapper}>
            <AppArticleTitle
              title="გამოთვალე ლიზინგის თანხა"
              description="შეიყვანეთ მონაცემები და გამოთვალე მიახლოებითი ხარჯი"
            />
            <AppCalcLeasing />
          </div>
          <div className={styles.AppCalculator__wrapper}>
            <AppArticleTitle
              title="გამოთვალე განბაჟების თანხა"
              description="შეიყვანეთ მონაცემები და გამოთვალე მიახლოებითი ხარჯი"
            />
            <AppCalcLeasing />
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

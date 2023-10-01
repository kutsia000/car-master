import React from 'react';
import styles from './AppFindCar.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppImage from '../AppImage/AppImage';
import AppCarCard from './AppCarCard';
import AppButton from '../AppButton/AppButton';

export default function AppFindCar() {
  return (
    <section className={styles.AppFindCar}>
      <figure>
        <AppImage src={'/images/hero.jpg'} />
      </figure>
      <AppContainer>
        <AppSectionTitle
          title="იპოვე შენი ავტომობილი"
          subtitle="მიიღე ინფორმაცია ყველაზე კარგი ვარიანტების შესახებ"
        />
        <div className={styles.AppFindCar__cars}>
          <AppCarCard src={'/images/car-1.jpg'} model="2017 Audi Camaro 1SS" price="$41,085.00" />
          <AppCarCard src={'/images/car-2.jpg'} model="2017 Audi Camaro 1SS" price="$41,085.00" />
          <AppCarCard src={'/images/car-3.jpg'} model="2017 Audi Camaro 1SS" price="$41,085.00" />
          <AppCarCard src={'/images/car-4.jpg'} model="2017 Audi Camaro 1SS" price="$41,085.00" />
        </div>
        <AppButton label={'სრულად ნახვა'} large />
      </AppContainer>
    </section>
  );
}


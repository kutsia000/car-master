import React from 'react';
import styles from './AppCustomers.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppCustomerCard from './AppCustomerCard';

export default function AppCustomers() {
  return (
    <section className={styles.AppCustomers}>
      <AppContainer>
        <AppSectionTitle
          title="ჩვენი მომხარებლები"
          subtitle="გაეცანი ჩვენი მომხარებლების შეფასებებს ჩვენს შესახებ"
        />
        <div className={styles.AppCustomers__wrap}>
          <AppCustomerCard
            review="ძალიან კარგი სერვისი და თავისი საქმის პროფესიონალები. რეკომენდაციას ვუწევ Carline -ს !"
            name="მაია ჭიღლაძე"
          />
          <AppCustomerCard
            review="ნამდვილად ძალიან შეღავათიან ფასში და რაც მთავარია უმოკლეს დროში შეძლეს ჩემი დახმარება."
            name="მაია ჭიღლაძე"
          />
          <AppCustomerCard
            review="პირველად ვისარგებლე ამ კომპანიის სერვისით , არ ვიცოდი რა იქნებოდა თუმცა არ ვნანობ ! ! !"
            name="ლაშა მურადაშვილი"
          />
        </div>
      </AppContainer>
    </section>
  );
}

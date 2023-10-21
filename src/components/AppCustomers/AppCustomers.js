import React, { useState, useContext, useEffect } from 'react';
import styles from './AppCustomers.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppCustomerCard from './AppCustomerCard';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';

export default function AppCustomers() {
  const { reviews } = useContext(LandingServiceContext);

  useEffect(() => {
    //console.log(reviews);
  }, [reviews]);

  return (
    <section className={styles.AppCustomers}>
      <AppContainer>
        <AppSectionTitle
          title="ჩვენი მომხარებლები"
          subtitle="გაეცანი ჩვენი მომხარებლების შეფასებებს ჩვენს შესახებ"
        />
        <div className={styles.AppCustomers__wrap}>
          {reviews &&
            reviews.map((review) => {
              return (
                <AppCustomerCard
                  key={review.div}
                  review={review.text}
                  name={review.fullName}
                  image={'https://cl1ne.ge' + review.imgUrl}
                />
              );
            })}
          {/* <AppCustomerCard
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
          /> */}
        </div>
      </AppContainer>
    </section>
  );
}

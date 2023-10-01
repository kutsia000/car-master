import React from 'react';
import styles from './AppService.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppServiceCard from './AppServiceCard';

export default function AppService() {
  return (
    <section className={styles.AppService}>
      <AppContainer>
        <AppSectionTitle
          title="ქარლაინ ავტო იმპორტი"
          subtitle=" კომპანიას აქვს ყველა ის პირობა, რაც მომხმარებლებისთვის კომფორტისა და სიმშვიდის გარანტია."
        />
        <article className={styles.AppService__wrap}>
          <AppServiceCard
            src={'/images/car.svg'}
            title="ყველა ბრენდი"
            subtitle="ჩვენი დახმარებით შეგიძლიათ მარტივად შეიძინოთ ნებისმიერი ბრენდის ახალი თუ მეორადი ავტომობილი."
          />
          <AppServiceCard
            src={'/images/group.svg'}
            title="მხარდაჭერა 24/7 "
            subtitle="კომპანია საკუთარ მომხმარებლებს უცხადებს სრულ მხარდაჭერას, კონსულტაციასა და პროცესების სრულ მართვაში."
          />
          <AppServiceCard
            src={'/images/deal.svg'}
            title="გამჭირვალე პროცესი"
            subtitle=" პროცესი არის სრულად გამჭვირვალე, რაც წარმოადგენს კომპანიის ერთ-ერთი მთავარ ფაქტორს სანდოობის მხრივ."
          />
          <AppServiceCard
            src={'/images/accessibility.svg'}
            title="ხელმისაწვდომობა"
            subtitle="კომპანია გთავაზობთ სხვადასხვა ფასის ავტომობილებს, რომელიც ხელმისაწვდომია ყველასთვის, ვისაც ავტომობილის შეძენა სურს."
          />
        </article>
      </AppContainer>
    </section>
  );
}

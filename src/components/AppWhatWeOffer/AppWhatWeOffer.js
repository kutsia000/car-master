import React from 'react';
import styles from './AppWhatWeOffer.module.scss'
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppServiceCard from '../AppService/AppServiceCard';

export default function AppWhatWeOffer() {
  return (
    <section className={styles.AppWhatWeOffer}>
      <AppContainer>
        <AppSectionTitle
          title="რას გთავაზობთ ჩვენ"
          subtitle="გაეცანი იმ უპირატესობებს რომლითაც ისარგაბლებ ჩვენთან თანამშრომლობისას"
        />
        <article className={styles.AppWhatWeOffer__wrap}>
          <AppServiceCard
            src={'/images/car.svg'}
            title="კომპორტი"
            subtitle="კომპანია გაგიწევთ კომფორტულ მომსახურებას, რაც გულისხმობს მისაღებ ფასს, სწრაფ და უსაფრთხო ტრანსპორტირებას."
          />
          <AppServiceCard
            src={'/images/group.svg'}
            title="მხარდაჭერა 24/7 "
            subtitle="ჩვენი გამოცდილი თანამშრომლები, მოიპოვებენ ავტომობილზე სრულ ინფორმაციას, შეისყიდიან და მოახდენენ ტრანსპორტირებას."
          />
          <AppServiceCard
            src={'/images/deal.svg'}
            title="დილერები"
            subtitle=" ჩვენ მომსახურებას ვუწევთ, როგორც კერძო პირებსა და ბიზნეს კომპანიებს, ასევე საუკეთესო პირობებს ვთავაზობთ დილერებსაც."
          />
          <AppServiceCard
            src={'/images/accessibility.svg'}
            title="ფასდაკლება"
            subtitle="ჩვენს მომხმარებლებს ექნებათ საშუალება მიიღონ ფასდაკლება ამერიკულ საიტებზე განთავსებულ სატრანსპორტო საშუალებებზე."
          />
        </article>
      </AppContainer>
    </section>
  );
}

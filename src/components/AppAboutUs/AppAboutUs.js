import React from 'react';
import styles from './AppAboutUs.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';

export default function AppAboutUs() {
  return (
    <section className={styles.AppAboutUs}>
      <AppContainer>
        <AppSectionTitle
          title="Carline Auto Import"
          subtitle="გაეცანი დეტალურ ინფორმაციას ჩვენს შესახებ"
        />
        <div className={styles.AppAboutUs__content}>
          <p>
            „ქარლაინ ავტო იმპორტი“ უზრუნველყოფს ავტომობილების, მოტოციკლების, სპეც-ტექნიკის შეძენასა
            და ტრანსპორტირებას ამერიკის შეერთებული შტატების შვიდი პორტიდან და ასევე კანადიდან. ჩვენ
            წარმოვადგენთ პირველ ავტოიმპორტიორ კომპანიას საქართველოში, რომელიც თანამშრომლობს
            უმსხვილეს ამერიკულ სადაზღვევო კომპანიებთან. მხოლოდ ჩვენს მომხმარებლებს აქვთ საშუალება
            აუქციონამდე მიიღონ წინასწარი ინფორმაცია და დამატებითი ფოტოები სასურველი ავტომობილის
            შესახებ
          </p>
        </div>
      </AppContainer>
    </section>
  );
}

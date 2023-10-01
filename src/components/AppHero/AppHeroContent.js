import React from 'react';
import styles from './AppHeroContent.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';

export default function AppHeroContent() {
  return (
    <AppContainer>
      <article className={styles.AppHeroContent}>
        <div className={styles.AppHeroContent__title}>ჩვენს შესახებ</div>
        <div className={styles.AppHeroContent__desc}>
          CarLine Auto Import 3+ წელია უზრუნველყოფს მომხარებლისთვის ავტოტექნიკის ჩამოყვანისას ყველა
          საჭირო დეტალას,
        </div>
      </article>
    </AppContainer>
  );
}

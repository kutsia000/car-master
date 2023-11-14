import React from 'react';
import styles from './AppContactInfoCard.module.scss';
import AppLink from '../AppLink';

export default function AppContactInfoCard() {
  return (
    <article className={styles.AppContactCard}>
      <h2 className={styles.AppContactCard__title}>საკონტაქტო ინფორმაცია</h2>
      <div className={styles.AppContactCard__info}>
        <span>მისამართი : ვაჟა ფშაველას გამზირი , N71</span>
        <span>
          ელ-ფოსტა: <AppLink href={`mailto:info@cline.ge`}>info@cline.ge</AppLink>
        </span>
        <span>
          საკონტაქტო ნომერი: <AppLink href={`tel:+032 2 800 803`}>032 2 800 803</AppLink>{' '}
        </span>
      </div>
    </article>
  );
}

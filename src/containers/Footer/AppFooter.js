import React from 'react';
import styles from './AppFooter.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppImage from '../../components/AppImage/AppImage';
import AppSocials from '../../components/AppSocials/AppSocials';
import AppLink from '../../components/AppLink';
import classNames from 'classnames';
import Navigation from '../Header/Subcomponents/Navigation/Navigation';

export default function AppFooter() {
  const submitHandler = () => console.log('subscribe');

  return (
    <footer className={styles.AppFooter}>
      <AppContainer>
        <section className={styles.AppFooter__wrapper}>
          <div className={styles.AppFooter__left}>
            <div className={styles.AppFooter__leftWrap}>
              <AppLink to={`/#`}>
                <figure>
                  <AppImage src={'/images/logo.svg'} />
                </figure>
              </AppLink>
              <AppSocials />
            </div>
            <span
              className={classNames(styles.AppFooter__left, [styles['AppFooter__left--copyright']])}
            >
              2023. საქართველო, თბილისი | ყველა უფლება დაცულია
            </span>
          </div>
          <div className={styles.AppFooter__middle}>
            <Navigation footer={true} />
          </div>
          <div className={styles.AppFooter__right}>
            <h3
              className={classNames(styles.AppFooter__right, [styles['AppFooter__right--title']])}
            >
              სიახლეების მისაღებად გამოგვიწერე
            </h3>
            <div
              className={classNames(styles.AppFooter__right, [styles['AppFooter__right--desc']])}
            >
              თვალი ადევნეთ ჩვენს მუდამ განვითარებადი პროდუქტების მახასიათებლებსა და ტექნოლოგიას.
              შეიყვანეთ თქვენი ელ-ფოსტა და გამოიწერეთ სიახლეები.
            </div>
            <div
              className={classNames(styles.AppFooter__right, [
                styles['AppFooter__right--subscribe'],
              ])}
            >
              <input type="email" placeholder="შეიყვანეთ ელ-ფოსტა" />
              <input type="submit" value="გამოიწერე" onClick={submitHandler} />
            </div>
          </div>
        </section>
      </AppContainer>
    </footer>
  );
}

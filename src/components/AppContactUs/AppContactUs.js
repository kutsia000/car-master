import React from 'react';
import styles from './AppContactUs.module.scss';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import AppContactCard from './AppContactCard';
import AppButton from '../AppButton/AppButton';
import classNames from 'classnames';

export default function AppContactUs() {
  return (
    <section className={styles.AppContactUs}>
      <AppContainer>
        <AppSectionTitle
          title="დაგვიკავშრიდთ"
          subtitle="დაგვიკავშირდით და ჩვენ აგისრულებთ თქვენს ოცნებას"
        />
        <div className={styles.AppContactUs__details}>
          <div className={styles.AppContactUs__cards}>
            <AppContactCard name="მისამართი" description="ვაჟა ფშაველას N21">
              <LocationIcon />
            </AppContactCard>
            <AppContactCard name="მობილური" description="+(995) 557 27 27 97">
              <PhoneIcon />
            </AppContactCard>
            <AppContactCard name="კომპანიის ტელეფონი" description="0 322 800 803">
              <PhoneIcon />
            </AppContactCard>
            <AppContactCard name="ელ-ფოსტა" description="info@cline.ge">
              <MailIcon />
            </AppContactCard>
          </div>
          <div className={styles.AppContactUs__formWrap}>
            <form>
              <div>
                <input type="text" placeholder="სახელი" />
                <input type="email" placeholder="ელ-ფოსტა" />
                <input type="number" placeholder="ტელეფონი" min={0} />
              </div>
              <textarea
                rows="4"
                cols="80"
                placeholder="მოგვწერეთ თუ რა სახის დახმარება გჭირდებათ ჩვენგან და ჩვენი გუნდი უმოკლეს დროში დაგიკავშირდებთ"
              />
              <AppButton label="გაგზავნა" large type={'submit'} />
            </form>
            <div className={styles.AppContactUs__hours}>
              <span
                className={classNames(styles.AppContactUs__hours, [
                  styles['AppContactUs__hours--title'],
                ])}
              >
                სამუშაო საათები
              </span>
              <div
                className={classNames(styles.AppContactUs__hours, [
                  styles['AppContactUs__hours--workdays'],
                ])}
              >
                <div>ორშ:</div>
                <div>09:00 - 18:00</div>
                <div>სამ:</div>
                <div>09:00 - 18:00</div>
                <div>ოთხ:</div>
                <div>09:00 - 18:00</div>
                <div>ხუთ:</div>
                <div>09:00 - 18:00</div>
                <div>პარ:</div>
                <div>09:00 - 18:00</div>
                <div>შაბ:</div>
                <div>09:00 - 18:00</div>
                <div>კვი:</div>
                <div>09:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>
  );
}

const LocationIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="99" height="99" viewBox="0 0 99 99" fill="none">
      <path
        d="M86.625 41.25C86.625 70.125 49.5 94.875 49.5 94.875C49.5 94.875 12.375 70.125 12.375 41.25C12.375 31.4038 16.2864 21.9609 23.2487 14.9987C30.2109 8.03637 39.6538 4.125 49.5 4.125C59.3462 4.125 68.789 8.03637 75.7513 14.9987C82.7136 21.9609 86.625 31.4038 86.625 41.25Z"
        stroke="#DB2D2E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M49.5 53.625C56.3345 53.625 61.875 48.0845 61.875 41.25C61.875 34.4155 56.3345 28.875 49.5 28.875C42.6655 28.875 37.125 34.4155 37.125 41.25C37.125 48.0845 42.6655 53.625 49.5 53.625Z"
        stroke="#DB2D2E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PhoneIcon = () => {
  return (
    <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M90.7499 69.7949V82.1699C90.7546 83.3187 90.5192 84.4559 90.059 85.5085C89.5988 86.5611 88.9238 87.506 88.0772 88.2826C87.2307 89.0592 86.2313 89.6505 85.143 90.0186C84.0547 90.3866 82.9016 90.5233 81.7574 90.4199C69.0641 89.0407 56.8713 84.7033 46.1587 77.7562C36.1919 71.4229 27.7419 62.9729 21.4087 53.0062C14.4373 42.2449 10.0989 29.9928 8.74491 17.2424C8.64183 16.1017 8.77739 14.952 9.14297 13.8666C9.50855 12.7812 10.0961 11.7838 10.8683 10.9378C11.6405 10.0919 12.5804 9.41609 13.628 8.95331C14.6757 8.49054 15.8083 8.25099 16.9537 8.24991H29.3287C31.3305 8.23021 33.2713 8.93911 34.7892 10.2445C36.307 11.5499 37.2985 13.3626 37.5787 15.3449C38.101 19.3052 39.0696 23.1937 40.4662 26.9362C41.0211 28.4126 41.1413 30.0172 40.8123 31.5598C40.4833 33.1024 39.719 34.5184 38.6099 35.6399L33.3712 40.8787C39.2433 51.2058 47.794 59.7565 58.1212 65.6287L63.3599 60.3899C64.4814 59.2809 65.8974 58.5165 67.44 58.1875C68.9826 57.8586 70.5872 57.9787 72.0637 58.5337C75.8062 59.9302 79.6946 60.8988 83.6549 61.4212C85.6587 61.7038 87.4887 62.7131 88.7969 64.2571C90.105 65.801 90.8001 67.7719 90.7499 69.7949Z"
        stroke="#DB2D2E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="99" height="99" viewBox="0 0 99 99" fill="none">
      <path
        d="M16.25 17H82.25C86.7875 17 90.5 20.7125 90.5 25.25V74.75C90.5 79.2875 86.7875 83 82.25 83H16.25C11.7125 83 8 79.2875 8 74.75V25.25C8 20.7125 11.7125 17 16.25 17Z"
        stroke="#DB2D2E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90.5 25.25L49.25 54.125L8 25.25"
        stroke="#DB2D2E"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

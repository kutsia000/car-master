import React, { useContext, useState } from 'react';
import AppSectionTitle from '../../AppSectionTitle/AppSectionTitle';
import { AuthServiceContext } from '../../../services/AuthService';
import styles from './AppAdminProfile.module.scss';
import AppButton from '../../AppButton/AppButton';

export default function AppAdminProfile() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div style={{ background: 'black', flex: 1, marginLeft: 240, marginTop: 100 }}>
      <AppSectionTitle title={'პროფილი'} subtitle={'სურვილის შემთხვევაში შეცვალეთ მონაცემები'} />
      <div className={styles.AppAdminProfile__user}>
        <h3 className={styles['AppAdminProfile__user--title']}>მომხარებელი</h3>
        <div className={styles['AppAdminProfile__user--Details']}>
          <span>სახელი:</span>
          <span>Carline555</span>

          <span>როლი:</span>
          <span>Dealer</span>
        </div>
      </div>
      <div className={styles.AppAdminProfile__user}>
        <h3 className={styles['AppAdminProfile__user--title']}>პაროლის ცვლილება</h3>
        <form className={styles['AppAdminProfile__user--form']}>
          <input type="text" placeholder="ძველი პაროლი" />
          <input type="text" placeholder="ახალი პაროლი" />
          <input type="text" placeholder="გაიმეორეთ ახალი პაროლი" />
          <AppButton label={'შეცვლა'} full/>
        </form>
      </div>
    </div>
  );
}

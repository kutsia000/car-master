import React, { useContext, useEffect, useState } from 'react';
import AppSectionTitle from '../AppSectionTitle/AppSectionTitle';
import styles from '../Admin/AppAdminProfile/AppAdminProfile.module.scss';
import AppButton from '../AppButton/AppButton';
import { EmployeeServiceContext } from '../../services/Employee/EmployeeService';

export default function AppEmployeeProfile() {
  const { resetPassword, success, user } = useContext(EmployeeServiceContext);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  // const { user, resetPassword, success, message } = useContext(DealerServiceContext);
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setUserType(user.userTypeName);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password.length < 8) {
      alert('პაროლი მინიმუმ 8 სიმბოლოს უნდა შეიცავდეს');
      return;
    }
    await resetPassword(formValues);
    console.log(success);
    if (success) {
      alert('პაროლი შეიცვალა');
      setFormValues((prevValues) => ({
        username: '',
        password: '',
      }));
    }
  };

  return (
    <>
      <AppSectionTitle title={'პროფილი'} subtitle={'სურვილის შემთხვევაში შეცვალეთ მონაცემები'} />
      <div className={styles.AppAdminProfile__user}>
        <h3 className={styles['AppAdminProfile__user--title']}>მომხარებელი</h3>
        <div className={styles['AppAdminProfile__user--Details']}>
          <span>სახელი:</span>
          <span>{userName}</span>

          <span>როლი:</span>
          <span>{userType}</span>
        </div>
      </div>
      <div className={styles.AppAdminProfile__user}>
        <h3 className={styles['AppAdminProfile__user--title']}>პაროლის ცვლილება</h3>
        <form className={styles['AppAdminProfile__user--form']} onSubmit={handleSubmit}>
          {/* <input type="text" placeholder="ძველი პაროლი" /> */}
          <input
            type="password"
            placeholder="ახალი პაროლი"
            name="password"
            onChange={handleChange}
          />
          <input type="password" placeholder="გაიმეორეთ ახალი პაროლი" />
          <AppButton label={'შეცვლა'} full type={'submit'} />
        </form>
      </div>
    </>
  );
}

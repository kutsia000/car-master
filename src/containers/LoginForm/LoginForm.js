import { useContext, useState } from 'react';
import { AuthServiceContext } from '../../services/AuthService';
import InputComponent from '../../components/Input/InputComponent';
import styles from './AppLoginForm.module.scss';
import AppImage from '../../components/AppImage/AppImage';
import AppButton from '../../components/AppButton/AppButton';

const LoginForm = () => {
  const { login, error } = useContext(AuthServiceContext);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formValues;
    //console.log([username, password]);
    await login({ username: username, password: password });
  };

  return (
    <div className={styles.AppLoginForm}>
      <div className={styles.AppLoginForm__container}>
        <div className={styles.AppLoginForm__top}>
          <figure>
            <AppImage src={'/images/logo.svg'} />
          </figure>
          <h3 className={styles.AppLoginForm__title}>სისტემაში შესვლა</h3>
          <span className={styles.AppLoginForm__subtitle}>შეიყვანეთ მონაცემები რათა შეძლოთ სისტემაში ავტორიზაცია</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputComponent
            label="UserName"
            placeholder="Enter your UserName"
            type="text"
            name="username"
            onChange={(e) => handleChange(e)}
            required
            value={formValues.name}
          />
          <InputComponent
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            required
          />
          {error && <p>{error}</p>}
          <AppButton type={'submit'} full label='შესვლა'/>
          {/* validationRegex={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}` */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

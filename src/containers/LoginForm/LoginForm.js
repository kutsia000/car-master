import { useContext, useState } from 'react';
import { AuthServiceContext } from '../../services/AuthService';
import InputComponent from '../../components/Input/InputComponent';
//import AppButton from '../../components/Button/AppButton';

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
    <>
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
        <button type="submit">submit</button>
        {/* validationRegex={/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/}` */}
      </form>
    </>
  );
};

export default LoginForm;

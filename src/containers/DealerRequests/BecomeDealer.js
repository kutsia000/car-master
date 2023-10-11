import React, { useContext, useEffect, useState } from 'react';
import InputComponent from '../../components/Input/InputComponent';
import MaskedInput from '../../components/Input/MaskedInput';
import styles from './BecomeDealer.module.scss';
import { LandingServiceContext } from '../../services/LandingServices/LandingService';
import LoadingMarkUp from '../../components/Loading/Loading';
import AppButton from '../../components/AppButton/AppButton';
import AppContainer from '../../layout/AppContainer/AppContainer';
import AppSectionTitle from '../../components/AppSectionTitle/AppSectionTitle';

const BecomeDealer = () => {
  const { addDealerRequest, error, success } = useContext(LandingServiceContext);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [phoneError, setPhoneError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mainError, setMainError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    eMail: '',
    text: '',
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!formData.phoneNumber) {
      setIsPhoneValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const inputPhoneNumber = e.target.value.replace(/-/g, '');
    const isValidPhoneNumber = /^\d{3}\d{3}\d{3}$/.test(inputPhoneNumber);
    setIsPhoneValid(isValidPhoneNumber);
    setFormData((prevValues) => ({
      ...prevValues,
      phoneNumber: inputPhoneNumber,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMainError(null);
    setLoading(true);
    if (!isPhoneValid) {
      setMainError('Some inputs are not correct');
      return;
    } else {
      await addDealerRequest(formData);
      if (success) {
        alert('requested');
        setFormData({
          fullName: '',
          phoneNumber: '',
          eMail: '',
          text: '',
        });
      } else {
        alert(error);
      }
    }
    setLoading();
  };

  if (loading) {
    return <LoadingMarkUp />;
  }

  return (
    <section className={styles.BecomeDealer}>
      <AppContainer>
        <AppSectionTitle title="დაგვიკავშრიდით" />
        <div className={styles.BecomeDealer__formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <InputComponent
                label="fullName"
                placeholder="Enter your fullName"
                type="text"
                name="fullName"
                onChange={(e) => handleChange(e)}
                required
                value={formData.fullName}
              />
              <MaskedInput
                label="phone Number"
                id="phoneNumber"
                name="phoneNumber"
                onChange={handlePhoneChange}
                mask="999-999-999"
                value={formData.phoneNumber}
                isValid={isPhoneValid}
                errorMessage={phoneError}
              />
              <InputComponent
                label="EMail"
                placeholder="Enter your eMail"
                type="email"
                name="eMail"
                onChange={(e) => handleChange(e)}
                value={formData.eMail}
              />
            </div>
            <textarea
              rows="4"
              cols="80"
              placeholder="მოგვწერეთ თუ რა სახის დახმარება გჭირდებათ ჩვენგან და ჩვენი გუნდი უმოკლეს დროში დაგიკავშირდებთ"
            />
            <AppButton label="გაგზავნა" large type={'submit'} />
            {mainError && <p className={styles.BecomeDealer__errorMessage}>{mainError}</p>}
          </form>
        </div>
      </AppContainer>
    </section>

    /* <form onSubmit={handleSubmit}>
        <InputComponent
          label="fullName"
          placeholder="Enter your fullName"
          type="text"
          name="fullName"
          onChange={(e) => handleChange(e)}
          required
          value={formData.fullName}
        />
        <MaskedInput
          label="phone Number"
          id="phoneNumber"
          name="phoneNumber"
          onChange={handlePhoneChange}
          mask="999-999-999"
          value={formData.phoneNumber}
          isValid={isPhoneValid}
          errorMessage={phoneError}
        />
        <InputComponent
          label="EMail"
          placeholder="Enter your eMail"
          type="email"
          name="eMail"
          onChange={(e) => handleChange(e)}
          value={formData.eMail}
        />
        <InputComponent
          label="text"
          placeholder="text"
          type="text"
          name="text"
          onChange={(e) => handleChange(e)}
          value={formData.text}
        />
        <button type="submit">submit</button>
        
      </form> */
  );
};

export default BecomeDealer;

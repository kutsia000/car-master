export function validateForm(formData, t, needPassChange) {
  const errors = {};
  //console.log(formData);
  if (!formData.userName || formData.userName.length < 3) {
    errors.userName = t('userName_error');
  }

  if (needPassChange) {
    if (!/^(?=.*[A-Z])(?=.*[0-9]).{6,15}$/.test(formData.passwordHash)) {
      errors.passwordHash =
        'Password must have at least one uppercase letter, one number, and be between 6 and 15 characters';
    }
  }

  if (!/^5\d{8}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Invalid Phone Number';
  }

  if (formData.email && !/^[\w.-]+@[\w.-]+\.\w+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.personalId) {
    errors.personalId = 'Personal ID is required';
  }

  if (!formData.dateBirth) {
    errors.dateBirth = 'Date of birth is required';
  }

  if (!formData.userTypeId) {
    errors.userTypeId = 'userType is Required';
  }

  return errors;
}

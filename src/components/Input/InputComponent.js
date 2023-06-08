import React, { useState } from 'react';

const InputComponent = ({
  label,
  placeholder,
  type,
  required,
  name,
  validationRegex,
  onChange,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (required && inputValue.trim() === '') {
      setError(`${label} is required.`);
    } else if (validationRegex && !validationRegex.test(inputValue)) {
      setError(`Invalid ${label}.`);
    } else {
      setError('');
    }
    onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputComponent;

import React, { useState } from 'react';

const InputComponent = ({
  label,
  placeholder,
  type,
  required,
  id,
  name,
  validationRegex,
  onChange,
  value,
  containerClass,
  className,
  labelClass,
}) => {
  //const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    //setValue(inputValue);

    if (required && inputValue.trim() === '') {
      setError(`${label} is required.`);
    } else if (validationRegex && !validationRegex.test(inputValue)) {
      setError(`Invalid ${label}.`);
    } else {
      setError('');
    }
    onChange(e);
  };

  return (
    <div className="form-group row">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className={containerClass}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          id={id}
          name={name}
          required={required}
          className={error ? `${className} is-invalid` : className}
          onChange={handleChange}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputComponent;

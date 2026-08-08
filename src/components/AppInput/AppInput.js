import React from 'react';
import styles from './AppInput.module.scss';

function AppInput({
  type,
  placeholder,
  onChange,
  name,
  min,
  id,
  label,
  currency,
  disabled,
  value,
  isUSD,
}) {
  return (
    <div className={styles.AppInput}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.AppInput__wrapper}>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          min={min}
          disabled={disabled}
          value={value}
        />
        {currency && <span className={styles.AppInput__currency}>{isUSD ? '$' : '₾'}</span>}
      </div>
    </div>
  );
}

export default AppInput;

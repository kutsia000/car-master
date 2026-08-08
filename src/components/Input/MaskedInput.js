import React from 'react';
import ReactInputMask from 'react-input-mask';

const MaskedInput = ({ id, name, label, mask, value, onChange, isValid, errorMessage }) => {
  return (
    <div className="form-group row gap-2">
      <label htmlFor={id}>{label}</label>
      <ReactInputMask
        id={id}
        name={name}
        mask={mask}
        value={value}
        onChange={onChange}
        className={`form-control ${!isValid ? 'is-invalid' : ''}`}
      />
      {!isValid && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default MaskedInput;

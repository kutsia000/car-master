import React from 'react';
import Select from 'react-select';

const YearSelect = ({
  id,
  name,
  value,
  label,
  placeholder,
  onChange,
  required,
  className,
  labelClass,
  error,
  isSearchable,
}) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1920;

  const yearOptions = [];

  for (let year = currentYear; year >= startYear; year--) {
    var obj = { value: year, label: year };
    yearOptions.push(obj);
  }

  console.log([id, name, placeholder]);

  return (
    <>
      <div className="form-group row">
        <label htmlFor={id} className="col-sm-12 col-md-4 col-lg-4 col-form-label">
          Year
        </label>
        <div className="col-sm-12 col-md-8 col-lg-8">
          <Select
            options={yearOptions}
            id={id}
            value={value}
            isSearchable={isSearchable}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
          />
          {error && (
            <span
              style={{
                display: 'block',
                width: '100%',
                marginTop: '0.25rem',
                fontSize: '.875rem',
                color: '#dc3545',
              }}
            >
              {error}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default YearSelect;

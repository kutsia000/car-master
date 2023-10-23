import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '48px',
    height: '48px',
    display: 'inline-flex',
    border: '1px solid white',
    width: '100%',
    borderRadius: '4px',
    boxShadow: 'none',
    transition: '.3s ease',
    color: 'white',
    fontWeight: '400',
    cursor: 'pointer',
    padding: '0 5px',
    background: '#131415',
    '&:hover': {
      color: '#242426',
    },
  }),

  input: (provided) => ({
    ...provided,
    margin: '-4px 0',
    color: 'white',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
  }),

  placeholder: (provided, state) => ({
    ...provided,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    alignSelf: 'center',
    color: state.selectProps.isDisabled ? '#475467' : 'white',
    textOverflow: 'ellipsis',
    maxWidth: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: '100%',
    fontFeatureSettings: '"case" on',
    fontFamily: 'FiraGO',
    opacity: 0.76,
    marginTop: 20,
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.selectProps.isDisabled ? '#475467' : 'white',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
    transition: '.3s',
    '&:hover': {
      opacity: '.8',
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: '100%',
    overflow: 'hidden',
    zIndex: 3,
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#242426',
    background: state.isSelected ? '#2D2D2D' : 'transparent',
    transition: '.3s',
    wordWrap: 'break-word',
    cursor: 'pointer',
    '&:active': {
      background: 'transparent',
    },
  }),
  clearIndicator: () => ({
    color: '#475467',
    '&:hover': {
      color: '#475467',
    },
  }),
};

export default function AppSelect({
  options,
  placeholder,
  value,
  clearable,
  searchable,
  multiple,
  onChange,
}) {
  //console.log(value);
  return (
    <Select
      options={options}
      styles={customStyles}
      className="react-select-container"
      placeholder={placeholder}
      isClearable={clearable}
      value={value}
      isSearchable={searchable}
      isMulti={multiple}
      onChange={onChange}
    />
  );
}

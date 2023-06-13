import React from 'react';

const ButtonComponent = ({ label, type, onClick, loading }) => {
  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <button type={type} onClick={handleClick} disabled={loading}>
      {label}
    </button>
  );
};

export default ButtonComponent;

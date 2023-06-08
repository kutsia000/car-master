import React, { useState } from 'react';

const ButtonComponent = ({ label, type, onClick, loading }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (!loading) {
      setClicked(true);
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={loading}
      className={`button ${clicked ? 'clicked' : ''} ${loading ? 'loading' : ''}`}
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default ButtonComponent;

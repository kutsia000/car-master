import React from 'react';

const ExcelIcon = ({ size = '1em' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="none" />
      <path
        d="M184,24H72A16,16,0,0,0,56,40V216a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V40A16,16,0,0,0,184,24Z"
        fill="#1D6F42"
      />
      <path d="M192,64H248a8,8,0,0,1,8,8V184a8,8,0,0,1-8,8H192Z" fill="#33C481" />
      <path
        d="M98.8,104,84,128l14.8,24h-14L76,140l-8.8,12h-14L68,128,53.2,104h14L76,116l8.8-12Z"
        fill="#fff"
      />
    </svg>
  );
};

export default ExcelIcon;

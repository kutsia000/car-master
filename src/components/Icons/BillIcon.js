import React from 'react';

const BillIcon = ({ size = '1em', background = '#21A366', symbolColor = '#FFFFFF' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Background circle */}
      <circle cx="256" cy="256" r="256" fill={background} />

      {/* Dollar symbol */}
      <path
        fill={symbolColor}
        d="M288 142h-64c-8.8 0-16 7.2-16 16v6c-36.7 6.2-64 32.6-64 65.4 0 41.3 36.6 59.1 64 66.8v67.8h-24c-8.8 0-16 7.2-16 16v16h64v16c0 8.8 7.2 16 16 16h16v-32c38.7-6.4 64-32.1 64-65.4 0-40.5-36.6-58.5-64-66.3V174h24c8.8 0 16-7.2 16-16v-16h-64v-16c0-8.8-7.2-16-16-16h-16v32c-37 6.4-64 32-64 64.5 0 39.7 36.3 57.5 64 64.8V338h-24c-8.8 0-16 7.2-16 16v16h64v16c0 8.8 7.2 16 16 16h16v-32c36.7-6.2 64-32.6 64-65.4 0-39.8-36.3-57.7-64-64.9V174h24c8.8 0 16-7.2 16-16v-16z"
      />
    </svg>
  );
};

export default BillIcon;

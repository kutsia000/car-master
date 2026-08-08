import styles from './AppDate.module.scss';

export default function AppDate({ date }) {
  return (
    <div className={styles.AppDate}>
      <CalendarIcon />
      <span>{date}</span>
    </div>
  );
}

const CalendarIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 25" fill="none">
      <g opacity="0.8">
        <path
          d="M19 4.43799H5C3.89543 4.43799 3 5.33342 3 6.43799V20.438C3 21.5426 3.89543 22.438 5 22.438H19C20.1046 22.438 21 21.5426 21 20.438V6.43799C21 5.33342 20.1046 4.43799 19 4.43799Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 2.43799V6.43799"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 2.43799V6.43799"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 10.438H21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

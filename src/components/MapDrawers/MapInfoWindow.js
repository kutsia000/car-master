import styles from './MapInfoWindow.module.scss';

export default function MapInfoWindow({  src, name }) {

  return (
    <div className={styles.MapInfoWindow}>
      <div className={styles.MapInfoWindow__Image}>
        <img src={src} alt={name} />
      </div>
      <div className={styles.MapInfoWindow__Body}>
        <div className={styles.MapInfoWindow__Title}>{name}</div>
      </div>
    </div>
  );
}

import styles from './AppContactCard.module.scss';

export default function AppContactCard({ children, name, description }) {
  return (
    <div className={styles.AppContactCard}>
      <figure className={styles.AppContactCard__icon}>{children}</figure>
      <h3 className={styles.AppContactCard__title}>{name}</h3>
      <span className={styles.AppContactCard__desc}>{description}</span>
    </div>
  );
}

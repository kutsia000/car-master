import styles from './Loading.module.scss'

const LoadingMarkUp = () => {
  return (
    <>
      <div className={styles.Loader}>
       <div className={styles.Loader__circle}/>
      </div>
    </>
  );
};

export default LoadingMarkUp;

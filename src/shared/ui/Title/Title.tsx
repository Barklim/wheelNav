import styles from "./Title.module.scss";
import classNames from "classnames";

export const Title = () => (
  <div className={styles.titleWrapper}>
    <div className={styles.preTitle}>
      <div className={styles.preTitle__border} />
    </div>
    <div className={styles.title}>Исторические даты</div>
  </div>
);

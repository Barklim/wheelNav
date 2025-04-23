import { PointDotProps } from "./types";
import styles from "./PointDot.module.scss";

export const PointDot = ({ point }: PointDotProps) => (
  <div className={styles.poinDotWrapper}>
    <span className={styles.pointDot}>{point.id}</span>  
  </div>
);
import { PointIamgeProps } from "./types";
import styles from "./PointIamge.module.scss";

export const PointImage = ({ point }: PointIamgeProps) => (
  <img src={point.src} alt={`Logo ${point.id}`} className={styles.pointImg} />
);
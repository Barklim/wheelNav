import { PointImgProps } from "./types";
import styles from "./PointIamge.module.scss";
import classNames from "classnames";

export const PointImage = ({ point, isActive }: PointImgProps) => (
  <img 
    src={point.src} 
    alt={`Logo ${point.id}`} 
    className={classNames(styles.pointImg, {
      [styles.active]: isActive
    })} 
  />
);
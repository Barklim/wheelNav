import { PointImgProps } from "./types";
import styles from "./PointIamge.module.scss";
import classNames from "classnames";

export const PointImage = ({ point, isActive }: PointImgProps) => (
  <img 
    src={`https://i.pravatar.cc/80?img=${point.id}`} 
    alt={`Logo ${point.id}`} 
    className={classNames(styles.pointImg, {
      [styles.active]: isActive
    })} 
  />
);
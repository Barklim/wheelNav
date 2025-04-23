import { PointDotProps } from "./types";
import styles from "./PointDot.module.scss";
import classNames from "classnames";

export const PointDot = ({ point, isActive }: PointDotProps) => (
  <div className={classNames(styles.poinDotWrapper, { [styles.active]: isActive })}>
    <span className={styles.pointDot}>{point.id}</span>
  </div>
);

// export const PointDot = ({ point, isActive }: PointDotProps) => {
//   console.log("!!! point");
//   console.log(point.id);
//   console.log(isActive);
//   console.log("!!!");
//   return (
//     <div
//       className={classNames(styles.poinDotWrapper, {
//         [styles.active]: isActive,
//       })}
//     >
//       <span className={styles.pointDot}>{point.id}</span>
//     </div>
//   );
// };

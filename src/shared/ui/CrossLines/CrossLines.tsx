import { FC } from "react";
import styles from "./CrossLines.module.scss";
import classNames from "classnames";

export interface CrossLinesProps {
  radius: number;
  fullMode?: boolean;
}

export type CrossLinesComponent = FC<CrossLinesProps>;

export const CrossLines = ({ radius, fullMode = false }: CrossLinesProps) => (
  <div style={{ top: radius, position: "relative" }}>
    <div
      className={classNames(styles.horizontalLine, {}, [
        fullMode ? styles.horizontalLine_full : undefined,
      ])}
      style={{ width: `${radius * 2}px`, left: `calc(50% - ${radius}px)` }}
    />
    <div
      className={classNames(styles.verticalLine, {}, [
        fullMode ? styles.verticalLine_full : undefined,
      ])}
      style={{ height: `${radius * 2}px`, top: `calc(50% - ${radius}px)` }}
    />
  </div>
);

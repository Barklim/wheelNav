import React, { useEffect} from "react";
import gsap from "gsap";
import { IntervalProps } from "./types";
import styles from "./Intervals.module.scss";

export const Intervals = ({
  intervals,
  activeItem,
  duration,
  radius,
}: IntervalProps) => {
  if (!intervals) {
    return null;
  }

  const [startInterval, setStartInterval] = React.useState({
    value: intervals[0]?.start ?? 2000,
  });
  const [endInterval, setEndInterval] = React.useState({
    value: intervals[0]?.end ?? 2000,
  });

  const diameter = radius * 2;
  const fontSize = `${radius * 0.74}px`;

  useEffect(() => {
    const target = { value: startInterval.value };
    if (intervals && intervals[activeItem]) {
      const startPosition = intervals[activeItem].start;
      gsap.to(target, {
        duration: duration * 1,
        value: startPosition,
        roundProps: "value",
        ease: "circ.out",
        onUpdate() {
          setStartInterval({ value: target.value });
        },
      });
    }
  }, [activeItem]);

  useEffect(() => {
    const target = { value: endInterval.value };
    if (intervals && intervals[activeItem]) {
      const endPosition = intervals[activeItem].end;
      gsap.to(target, {
        duration: duration * 1,
        value: endPosition,
        roundProps: "value",
        ease: "circ.out",
        onUpdate() {
          setEndInterval({ value: target.value });
        },
      });
    }
  }, [activeItem]);

  return (
    <>
      <div
        className={styles.intervalsOuter}
        style={{
          top: radius,
          position: "relative",
          fontSize: fontSize,
        }}
      >
        <span className={styles.startColor}>
          <span className={styles.a}>
            {String(startInterval.value).slice(0, 2)}
          </span>
        </span>
        <span
          className={styles.dummy}
          style={{ width: `${diameter}px` }}
        ></span>
        <span className={styles.endColor}>
          <span className={styles.a}>
            {String(endInterval.value).slice(-2)}
          </span>
        </span>
      </div>

      <div
        className={styles.intervalsInner}
        style={{
          top: radius,
          position: "relative",
          fontSize: fontSize,
          width: `${diameter}px`,
        }}
      >
        <span className={styles.startColor}>
          <span>{String(startInterval.value).slice(-2)}</span>
        </span>

        <span className={styles.endColor}>
          <span>{String(endInterval.value).slice(0, 2)}</span>
        </span>
      </div>
    </>
  );
};

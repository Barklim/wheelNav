import React, { useEffect } from "react";
import gsap from "gsap";
import { IntervalProps } from "./types";
import styles from "./Intervals.module.scss";

const Intervals = ({ intervals, activeItem, duration, radius}: IntervalProps) => {
    if (!intervals) {return null}

    const [startInterval, setStartInterval] = React.useState({ value: intervals[0]?.start ?? 2000 })
    const [endInterval, setEndInterval] = React.useState({ value: intervals[0]?.end ?? 2000 })

    useEffect(() => {
        const target = { value: startInterval.value };
        if (intervals && intervals[activeItem]) {
            const startPosition = intervals[activeItem].start
            gsap.to(target, {
                duration: duration*1,
                value: startPosition,
                roundProps: "value",
                ease: 'circ.out',
                onUpdate() {
                    setStartInterval({ value: target.value });
                }
            });
        }
    }, [activeItem]);

    useEffect(() => {
        const target = { value: endInterval.value };
        if (intervals && intervals[activeItem]) {
            const endPosition = intervals[activeItem].end
            gsap.to(target, {
                duration: duration*1,
                value: endPosition,
                roundProps: "value",
                ease: 'circ.out',
                onUpdate() {
                    setEndInterval({ value: target.value });
                }
            });
        }
    }, [activeItem]);

    return (
        <div className={styles.intervals} style={{top: radius, position: 'relative', fontSize: `${radius - 65}px`}}>
            <span className={styles.intervals__left}>{startInterval.value}</span>
            <span className={styles.intervals__right}>{endInterval.value}</span>
        </div>
    )
}

export default Intervals;
import React, { useEffect } from "react";
import gsap from "gsap";
import { IntervalProps } from "./types";

const Intervals = ({ intervals, activeItem, duration }: IntervalProps) => {
    if (!intervals) {return null}

    const [startInterval, setStartInterval] = React.useState({ value: intervals[1]?.start ?? 2000 })
    const [endInterval, setEndInterval] = React.useState({ value: intervals[1]?.end ?? 2000 })

    useEffect(() => {
        const target = { value: startInterval.value };
        if (intervals && intervals[activeItem + 1]) {
            const startPosition = intervals[activeItem + 1].start
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
        if (intervals && intervals[activeItem + 1]) {
            const endPosition = intervals[activeItem + 1].end
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
        <div>{startInterval.value} - {endInterval.value}</div>
    )
}

export default Intervals;
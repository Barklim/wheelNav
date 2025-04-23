import { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../../lib";
import { PointRef, OrbitRef, WheelNavWrapperProps } from "./types";
import { Point } from "../../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../constants/wheelNav";
import WheelNav from "./WheelNav";
import Intervals from "../Intervals/Intervals";
import styles from "./WheelNav.module.scss";

const { DURATION, RADIUS, INITIAL_ANGLE, INTERVALS } = WHEEL_NAV_CONSTANTS;

const WheelNavWrapper = ({
  initialPoints,
  intervals = INTERVALS,
  duration = DURATION,
  radius = RADIUS,
  initialAngle = INITIAL_ANGLE,
  customPoint,
}: WheelNavWrapperProps) => {
  const [points, setPoints] = useState<Point[]>(rotate(initialPoints, -1));
  const [activeItem, setActiveItem] = useState<number>(1);
  const orbitRef = useRef<OrbitRef>(null);
  const rotationStepRef = useRef<number>(1);

  const handleRotateComplete = (pointsRef: PointRef) => {
    const newPoints = rotate(points, rotationStepRef.current);
    setPoints(newPoints);

    const newActive = newPoints[newPoints.length - 1];
    const activePoint = pointsRef[newActive.id];
    if (activePoint) {
      activePoint.classList.add("active");
    }
  };

  const handleRotate = (step: number) => {
    rotationStepRef.current = step;
    orbitRef.current?.rotate(step);

    const rotatedPoints = rotate(points, step);
    const newActiveItem = rotatedPoints[rotatedPoints.length - 1].id;
    setActiveItem(Number(newActiveItem));
  };

  const handlePointClick = (clickedId: string) => {
    setActiveItem(Number(clickedId));

    const rotationStepsToActive = getRotationStepsToActive(points, clickedId);

    if (
      rotationStepsToActive !== 0 &&
      rotationStepsToActive !== points.length
    ) {
      handleRotate(rotationStepsToActive);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Intervals
        intervals={intervals}
        activeItem={activeItem}
        duration={duration}
        radius={radius}
      />
      <WheelNav
        ref={orbitRef}
        points={points}
        onRotateComplete={handleRotateComplete}
        onPointClick={handlePointClick}
        activeItem={activeItem}
        duration={duration}
        radius={radius}
        initialAngle={initialAngle}
        customPoint={customPoint}
      />
      <div style={{display: 'flex', flexDirection: 'row' }}>
        <button onClick={() => handleRotate(1)}>Left</button>
        <button onClick={() => handleRotate(-1)}>Right</button>
      </div>
    </div>
  );
};

export default WheelNavWrapper;

import { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../../lib";
import { PointRef, OrbitRef, WheelNavWrapperProps } from "./types";
import { Point } from "../../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../constants/wheelNav";
import { NavButton } from "../NavButton";
import { Intervals } from "../Intervals";
import WheelNav from "./WheelNav";
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
      <div className={styles.buttonsWrapper}>
        <p className={styles.buttonsTitle}>{`0${activeItem}/0${points.length}`}</p>
        <div className={styles.buttons}>
          <NavButton direction="left" disabled={activeItem === 1} onClick={() => handleRotate(1)} />
          <NavButton direction="right" disabled={activeItem === points.length} onClick={() => handleRotate(-1)} />
        </div>
      </div>
    </div>
  );
};

export default WheelNavWrapper;

import { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../utils";
import { Point, PointRef, OrbitRef, WheelNavWrapperProps } from "../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import WheelNav from "./WheelNav";

const { RADIUS, DURATION } = WHEEL_NAV_CONSTANTS;

const WheelNavWrapper = ({ initialPoints, radius = RADIUS, duration = DURATION }: WheelNavWrapperProps) => {
  const [points, setPoints] = useState<Point[]>(initialPoints);
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
  };

  const handlePointClick = (clickedId: string) => {
    const rotationStepsToActive = getRotationStepsToActive(points, clickedId);

    if (rotationStepsToActive !== 0 && rotationStepsToActive !== points.length) {
      handleRotate(rotationStepsToActive);
    }
  };

  return (
    <div>
      <button onClick={() => handleRotate(-1)}>Left</button>
      <button onClick={() => handleRotate(1)}>Right</button>

      <WheelNav
        ref={orbitRef}
        points={points}
        onRotateComplete={handleRotateComplete}
        onPointClick={handlePointClick}
        radius={radius}
        duration={duration}
      />
    </div>
  );
};

export default WheelNavWrapper;

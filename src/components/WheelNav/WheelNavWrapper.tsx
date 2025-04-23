import { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../utils";
import { Image, PointRef, OrbitRef, WheelNavWrapperProps } from "../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import WheelNav from "./WheelNav";

const { RADIUS } = WHEEL_NAV_CONSTANTS;

const WheelNavWrapper = ({ initialImages, radius = RADIUS }: WheelNavWrapperProps) => {
  const [images, setImages] = useState<Image[]>(initialImages);
  const orbitRef = useRef<OrbitRef>(null);
  const rotationStepRef = useRef<number>(1);

  const handleRotateComplete = (pointsRef: PointRef) => {
    const newImages = rotate(images, rotationStepRef.current);
    setImages(newImages);

    const newActive = newImages[newImages.length - 1];
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
    const rotationStepsToActive = getRotationStepsToActive(images, clickedId);

    if (rotationStepsToActive !== 0 && rotationStepsToActive !== images.length) {
      handleRotate(rotationStepsToActive);
    }
  };

  return (
    <div>
      <button onClick={() => handleRotate(-1)}>Left</button>
      <button onClick={() => handleRotate(1)}>Right</button>

      <WheelNav
        ref={orbitRef}
        images={images}
        onRotateComplete={handleRotateComplete}
        onPointClick={handlePointClick}
        radius={radius}
      />
    </div>
  );
};

export default WheelNavWrapper;

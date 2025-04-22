import { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../utils";
import { Image, PointRef, TestRef, WheelNavWrapperProps } from "../../types/wheelNav";
import WheelNav from "./WheelNav";

const WheelNavWrapper = ({ initialImages, circleSize }: WheelNavWrapperProps) => {
  const [images, setImages] = useState<Image[]>(initialImages);
  const orbitRef = useRef<TestRef>(null);
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
        circleSize={circleSize}
      />
    </div>
  );
};

export default WheelNavWrapper;

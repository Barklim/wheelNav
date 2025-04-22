import React, { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../../utils";
import Test from "./Test";
import { Image, PointRef, TestRef } from "../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";

const { INITIAL_IMAGES } = WHEEL_NAV_CONSTANTS;

const TestWrapper = () => {
  const [images, setImages] = useState<Image[]>(INITIAL_IMAGES);
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
      <button onClick={() => handleRotate(-1)}>Лево</button>
      <button onClick={() => handleRotate(1)}>Право</button>

      <Test
        ref={orbitRef}
        images={images}
        onRotateComplete={handleRotateComplete}
        onPointClick={handlePointClick}
      />
    </div>
  );
};

export default TestWrapper;

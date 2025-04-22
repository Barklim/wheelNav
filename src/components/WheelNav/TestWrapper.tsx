import React, { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../utils/utils";
import Test from "./Test";

const initialImages = [
  "https://i.pravatar.cc/80?img=1",
  "https://i.pravatar.cc/80?img=2",
  "https://i.pravatar.cc/80?img=3",
  "https://i.pravatar.cc/80?img=4",
  "https://i.pravatar.cc/80?img=5",
  "https://i.pravatar.cc/80?img=6",
];

const TestWrapper = () => {
  const [images, setImages] = useState(initialImages);
  const orbitRef = useRef(null);
  const rotationStepRef = useRef(1);

  const handleRotateComplete = (pointsRef) => {
    const newImages = rotate(images, rotationStepRef.current);
    setImages(newImages);
  
    const newActive = newImages[newImages.length - 1];
    const activePoint = pointsRef.current[newActive];
    if (activePoint) {
      activePoint.classList.add("active");
    }
  };
  
  const handleRotate = (step) => {
    rotationStepRef.current = step;
    orbitRef.current?.rotate(step);
  };

  const handlePointClick = (src) => {
    const rotationStepsToActive = getRotationStepsToActive(images, src)
    console.log(rotationStepsToActive);
    if (rotationStepsToActive !== 0) {
      handleRotate(-rotationStepsToActive);
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
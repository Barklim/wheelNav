import React, { useRef, useState } from "react";
import { rotate, getRotationStepsToActive } from "../utils/utils";
import Test from "./Test";

const initialImages = [
  { id: "1", src: "https://i.pravatar.cc/80?img=1" },
  { id: "2", src: "https://i.pravatar.cc/80?img=2" },
  { id: "3", src: "https://i.pravatar.cc/80?img=3" },
  { id: "4", src: "https://i.pravatar.cc/80?img=4" },
  { id: "5", src: "https://i.pravatar.cc/80?img=5" },
  { id: "6", src: "https://i.pravatar.cc/80?img=6" },
];

const TestWrapper = () => {
  const [images, setImages] = useState(initialImages);
  const orbitRef = useRef(null);
  const rotationStepRef = useRef(1);

  const handleRotateComplete = (pointsRef) => {
    const newImages = rotate(images, rotationStepRef.current);
    setImages(newImages);

    const newActive = newImages[newImages.length - 1];
    const activePoint = pointsRef.current[newActive.id];
    if (activePoint) {
      activePoint.classList.add("active");
    }
  };

  const handleRotate = (step) => {
    rotationStepRef.current = step;
    orbitRef.current?.rotate(step);
  };

  const handlePointClick = (clickedId) => {
    const rotationStepsToActive = getRotationStepsToActive(images, clickedId);

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

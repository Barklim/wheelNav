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

  const handleRotateComplete = () => {
    setImages(prev => rotate(prev, rotationStepRef.current));
  };

  const handleRotate = (step) => {
    rotationStepRef.current = step;
    orbitRef.current?.rotate(step);
  };

  const handlePointClick = (src) => {
    console.log("img, clicked", src);
    const rotationStepsToActive = getRotationStepsToActive(images, src)
    console.log(rotationStepsToActive);
  };

  return (
    <div>
      <button onClick={() => handleRotate(1)}>Вращать по часовой</button>
      <button onClick={() => handleRotate(-1)}>Вращать против часовой</button>

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
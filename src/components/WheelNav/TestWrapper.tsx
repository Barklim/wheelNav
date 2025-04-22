import React, { useRef, useState } from "react";
import { rotate } from "../../utils";
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

  const handleRotateComplete = () => {
    setImages(prev => {

      console.log("WTF inside");
      console.log(images);
      console.log(prev);
      return rotate(prev, 1)
    })
  };

  return (
    <div>
      <button onClick={() => orbitRef.current?.rotate(60)}>
        Запустить вращение
      </button>

      <Test
        ref={orbitRef}
        images={images}
        onRotateComplete={handleRotateComplete}
      />
    </div>
  );
};

export default TestWrapper;
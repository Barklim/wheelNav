import React, { useRef } from "react";
import Test from "./Test";

const TestWrapper = () => {
  const orbitRef = useRef(null);

  return (
    <div>
      <button onClick={() => orbitRef.current?.rotate()}>
        Запустить вращение
      </button>

      <Test
        ref={orbitRef}
        images={[
          "https://i.pravatar.cc/80?img=1",
          "https://i.pravatar.cc/80?img=2",
          "https://i.pravatar.cc/80?img=3",
          "https://i.pravatar.cc/80?img=4",
          "https://i.pravatar.cc/80?img=5",
          "https://i.pravatar.cc/80?img=6",
        ]}
      />
    </div>
  );
};

export default TestWrapper;
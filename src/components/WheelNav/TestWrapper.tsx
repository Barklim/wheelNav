import React, { useRef } from "react";
import Test6 from "./Test";

const TestWrapper = () => {
  const orbitRef = useRef(null);

  return (
    <div>
      <button onClick={() => orbitRef.current?.rotate()}>
        Запустить вращение
      </button>

      <Test6
        ref={orbitRef}
        images={[
          "https://i.pravatar.cc/80?img=1",
          "https://i.pravatar.cc/80?img=2",
          "https://i.pravatar.cc/80?img=3",
          "https://i.pravatar.cc/80?img=4",
        ]}
      />
    </div>
  );
};

export default TestWrapper;
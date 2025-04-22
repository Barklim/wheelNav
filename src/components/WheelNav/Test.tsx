import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const radius = 100;
const duration = 1;

function Test({ images }, ref) {
  const orbitRef = useRef(null);
  const tl = useRef(null);
  const rotationAngle = 360 / images.length

  useImperativeHandle(ref, () => ({
    rotate() {
      if (tl.current) tl.current.kill();
      tl.current = gsap.to(orbitRef.current, {
        rotation: `+=${rotationAngle}`,
        duration,
        ease: "power1.inOut",
      });
    },
  }));

  return (
    <div className="circle">
      <div className="logo-container" ref={orbitRef}>
        {images.map((src, i) => {
          const angle = (360 / images.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={i}
              className="point"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <img
                src={src}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
              <div>Some text</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default forwardRef(Test);

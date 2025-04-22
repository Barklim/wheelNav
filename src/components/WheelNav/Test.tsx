import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const radius = 100;
const duration = 1;

interface TestProps {
  images: string[];
}

export interface TestRef {
  rotate: () => void;
}

function Test({ images }: TestProps, ref: React.ForwardedRef<TestRef>) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Tween | null>(null);

  useImperativeHandle(ref, () => ({
    rotate() {
      if (tl.current) tl.current.kill();
      tl.current = gsap.to(orbitRef.current, {
        rotation: "+=360",
        duration,
        ease: "power1.inOut",
      });
    },
  }));

  return (
    <div className="circle">
      <div className="logo-container" ref={orbitRef}>
        {images.map((src: string, i: number) => {
          const angle = (360 / images.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={i}
              className="point"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <img
                src={src}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default forwardRef<TestRef, TestProps>(Test);

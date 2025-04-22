import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";

const radius = 100;
const duration = 1;

gsap.registerPlugin(MotionPathPlugin);

const Test = ({ images }, ref) => {
  const orbitRef = useRef(null);
  const tl = useRef(null);
  const rotationAngle = 360 / images.length;

  useImperativeHandle(ref, () => ({
    rotate() {
      if (tl.current) tl.current.kill();
      const bezierPath = images.map((_, i) => {
        const angle = (360 / images.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return { x: `${x + 100}px`, y: `${y + 100}px` }; // смещение для центра
      });

      tl.current = gsap.to(orbitRef.current, {
        duration: 10, // Время анимации
        repeat: -1, // Повторять бесконечно
        yoyo: true, // Возвращаться в начальное положение
        // bezier: bezierPath, // Массив точек для движения
        ease: "linear.none", // Линейное движение

        motionPath: {
          path: [{x: 100, y: -20}], // you probably want more points here...or just use an SVG <path>!
          curviness: 2,
          autoRotate: true
        }
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
                alt={`Logo ${i}`}
              />
              <div>SomeText</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(Test);

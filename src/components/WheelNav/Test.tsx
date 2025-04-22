import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const radius = 100;
const duration = 5;

const Test = ({ images }, ref) => {
  const pointsRef = useRef([]);
  const tls = useRef([]);

  useImperativeHandle(ref, () => ({
    rotate() {
      // Очистим старые анимации
      tls.current.forEach((tl) => tl.kill());
      tls.current = [];

      images.forEach((_, i) => {
        const angle = (360 / images.length) * i;

        // Создаем путь для точки по окружности
        const path = Array.from({ length: 360 }, (_, d) => {
          const rad = ((angle + d) * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return { x, y };
        });

        const tl = gsap.to(pointsRef.current[i], {
          duration,
          ease: "none",
          motionPath: {
            path,
            autoRotate: false,
          },
        });

        tls.current.push(tl);
      });
    },
  }));

  return (
    <div className="circle">
      <div className="logo-container">
        {images.map((src, i) => {
          const angle = (360 / images.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={i}
              className="point"
              ref={(el) => (pointsRef.current[i] = el)}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <img src={src} alt={`Logo ${i}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(Test);

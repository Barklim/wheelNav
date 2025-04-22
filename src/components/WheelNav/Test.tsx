import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const radius = 100;
const duration = 1.5;
const Test = ({ images, onRotateComplete }, ref) => {
  const pointsRef = useRef([]);
  const tls = useRef([]);
  const isRotatingRef = useRef(false); // флаг вращения

  useImperativeHandle(ref, () => ({
    rotate(degrees = 90) {
      if (isRotatingRef.current) return; // блокируем повторный вызов
      isRotatingRef.current = true;

      let completed = 0;
      // …очистка старых tl…

      // fade out текста
      gsap.to(pointsRef.current, {
        duration,
        stagger: 0.05,
        ease: "power1.out",
        css: { "--after-opacity": 0 },
      });

      images.forEach((_, i) => {
        const startAngle = (360 / images.length) * i;

        // length = degrees+1, чтобы пройти ровно degrees шагов
        const path = Array.from({ length: degrees + 1 }, (_, d) => {
          const a = ((startAngle + d) * Math.PI) / 180;
          return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
        });

        // ставим начальную точку
        const startRad = (startAngle * Math.PI) / 180;
        gsap.set(pointsRef.current[i], {
          x: Math.cos(startRad) * radius,
          y: Math.sin(startRad) * radius,
          transform: "translate(-50%,-50%)",
        });

        // анимируем по новому path
        const tl = gsap.to(pointsRef.current[i], {
          duration,
          ease: "none",
          motionPath: { path, autoRotate: false },
          onComplete: () => {
            completed++;
            if (completed === images.length) {
              isRotatingRef.current = false;
              // Counter of completed animations is completed
              console.log("WTF execute cb");
              onRotateComplete();
            }
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
              data-label="Some text"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
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

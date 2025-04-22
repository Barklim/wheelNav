import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { getStepAngle } from "../utils/utils";

gsap.registerPlugin(MotionPathPlugin);

const radius = 100;
const duration = 0.5;

const Test = ({ images, onRotateComplete, onPointClick, initialAngle = 0 }, ref) => {
  const pointsRef = useRef({});
  const tls = useRef([]);
  const isRotatingRef = useRef(false);

  useImperativeHandle(ref, () => ({
    rotate(step = 1) {
      if (isRotatingRef.current) return;
      isRotatingRef.current = true;

      let completed = 0;
      tls.current.forEach(tl => tl.kill());
      tls.current = [];

      const stepAngle = getStepAngle(images);
      const degrees = Math.abs(step) * stepAngle;
      const direction = Math.sign(step); 
      
      images.forEach((src, i) => {
        const point = pointsRef.current[src];
        point?.classList.remove('active');
        if (!point) return;

        gsap.to(pointsRef.current[src], {
          duration,
          stagger: 0.05,
          ease: "power1.out",
          css: { "--after-opacity": 0 },
        });

        const startAngle = ((360 / images.length) * i + initialAngle) % 360;

        const path = Array.from({ length: degrees }, (_, d) => {
          const a = ((startAngle + d * direction) * Math.PI) / 180;
          return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
        });

        const startRad = (startAngle * Math.PI) / 180;
        gsap.set(point, {
          x: Math.cos(startRad) * radius,
          y: Math.sin(startRad) * radius,
          transform: "translate(-50%, -50%)",
        });

        const tl = gsap.to(point, {
          duration,
          ease: "none",
          motionPath: { path, autoRotate: false },
          onComplete: () => {
            completed++;
            if (completed === images.length) {
              isRotatingRef.current = false;
              onRotateComplete(pointsRef);
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
          const isActive = i === images.length - 1;
          const angle = ((360 / images.length) * i + initialAngle) % 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={i}
              className={`point ${isActive ? "active" : ""}`}
              ref={(el) => {
                if (el) pointsRef.current[src] = el;
              }}
              data-label="Some text"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
              onClick={() => onPointClick?.(src)}
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

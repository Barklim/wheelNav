import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const radius = 100;
const duration = 1.5;
const Test = ({ images }, ref) => {
  const pointsRef = useRef([]);
  const tls = useRef([]);

  useImperativeHandle(ref, () => ({
    rotate() {
      tls.current.forEach((tl) => tl.kill());
      tls.current = [];
    
      // fade out текста
      gsap.to(pointsRef.current, {
        duration: 0.5,
        stagger: 0.05,
        ease: 'power1.out',
        css: { '--after-opacity': 0 },
      });
    
      // СОБИРАЕМ paths
      const paths = images.map((_, i) => {
        const angle = (360 / images.length) * i;
        return Array.from({ length: 360 }, (_, d) => {
          const a = ((angle + d) * Math.PI) / 180;
          return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
        });
      });
    
      // И анимируем
      images.forEach((_, i) => {
        const angle = (360 / images.length) * i;
        const rad   = (angle * Math.PI) / 180;
        const x     = Math.cos(rad) * radius;
        const y     = Math.sin(rad) * radius;
    
        gsap.set(pointsRef.current[i], { x, y, transform: 'translate(-50%,-50%)' });
    
        const tl = gsap.to(pointsRef.current[i], {
          duration,
          ease: 'none',
          motionPath: { path: paths[i], autoRotate: false },
        });
        tls.current.push(tl);
      });
    }
    ,
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
                position: 'absolute',
                top: '50%',
                left: '50%',
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

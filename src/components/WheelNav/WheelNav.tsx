import { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { getStepAngle } from "../../utils";
import { WheelNavProps, TestRef, PointRef, Image } from "../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";

gsap.registerPlugin(MotionPathPlugin);

const { RADIUS, DURATION } = WHEEL_NAV_CONSTANTS;

// TODO: reove after::css 
const WheelNav = forwardRef<TestRef, WheelNavProps>(
  ({ images, onRotateComplete, onPointClick, initialAngle = 0, circleSize }, ref) => {
    const pointsRef = useRef<PointRef>({});
    const tls = useRef<gsap.core.Tween[]>([]);
    const isRotatingRef = useRef<boolean>(false);

    useImperativeHandle(ref, () => ({
      rotate(step = 1) {
        if (isRotatingRef.current) return;
        isRotatingRef.current = true;

        let completed = 0;
        tls.current.forEach((tl) => tl.kill());
        tls.current = [];

        const stepAngle = getStepAngle(images);
        const degrees = Math.abs(step) * stepAngle;
        const direction = Math.sign(step);

        images.forEach((img: Image, i: number) => {
          const point = pointsRef.current[img.id];
          point?.classList.remove("active");
          if (!point) return;

          gsap.to(point, {
            duration: DURATION,
            stagger: 0.05,
            ease: "power1.out",
            css: { "--after-opacity": 0 },
          });

          const startAngle = ((360 / images.length) * i + initialAngle) % 360;
          const path = Array.from({ length: degrees }, (_, d) => {
            const a = ((startAngle + d * direction) * Math.PI) / 180;
            return { x: Math.cos(a) * RADIUS, y: Math.sin(a) * RADIUS };
          });

          const startRad = (startAngle * Math.PI) / 180;
          gsap.set(point, {
            x: Math.cos(startRad) * RADIUS,
            y: Math.sin(startRad) * RADIUS,
            transform: "translate(-50%, -50%)",
          });

          const tl = gsap.to(point, {
            duration: DURATION,
            ease: "none",
            motionPath: { path, autoRotate: false },
            onComplete: () => {
              completed++;
              if (completed === images.length) {
                isRotatingRef.current = false;

                onRotateComplete(pointsRef.current);

                const points = Object.values(pointsRef.current);
                const activePoint = points.find((el) =>
                  el?.classList.contains("active")
                );

                if (activePoint) {
                  gsap.to(activePoint, {
                    delay: 0.1,
                    duration: 0.5,
                    css: { "--after-opacity": 1 },
                    ease: "power1.out",
                    onComplete: () => {
                      activePoint.classList.add("active");
                    },
                  });
                }
              }
            },
          });

          tls.current.push(tl);
        });
      },
    }));

    return (
      <div 
        className="circle" 
        // ?
        style={circleSize ? {
          width: circleSize.width,
          height: circleSize.height
        } : undefined}
      >
        <div className="logo-container">
          {images.map((img: Image, i: number) => {
            const isActive = i === images.length - 1;
            const angle = ((360 / images.length) * i + initialAngle) % 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS;
            const y = Math.sin(rad) * RADIUS;

            return (
              <div
                key={img.id}
                className={`point ${isActive ? "active" : ""}`}
                ref={(el) => {
                  if (el) pointsRef.current[img.id] = el;
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                onClick={() => onPointClick?.(img.id)}
              >
                <img src={img.src} alt={`Logo ${img.id}`} />
                <span className="label">{String(img.src).slice(20, 34)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default WheelNav;

import { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { getStepAngle } from "../../utils";
import { WheelNavProps, OrbitRef, PointRef, Image } from "../../types/wheelNav";
import { WHEEL_NAV_CONSTANTS } from "../../shared/constants/wheelNav";
import styles from "./WheelNav.module.scss";

gsap.registerPlugin(MotionPathPlugin);

const { RADIUS, DURATION } = WHEEL_NAV_CONSTANTS;

const WheelNav = forwardRef<OrbitRef, WheelNavProps>(
  ({ images, onRotateComplete, onPointClick, initialAngle = 0, radius = RADIUS }, ref) => {
    const pointsRef = useRef<PointRef>({});
    const tls = useRef<gsap.core.Tween[]>([]);
    const isRotatingRef = useRef<boolean>(false);
    const isActiveAnimationRef = useRef<boolean>(false);
    const activePointRef = useRef<HTMLElement | null>(null);

    const handleAnimationComplete = () => {
      isRotatingRef.current = false;
      isActiveAnimationRef.current = false;
      activePointRef.current = null;
    };

    useImperativeHandle(ref, () => ({
      rotate(step = 1) {
        if (isRotatingRef.current || isActiveAnimationRef.current) return;
        isRotatingRef.current = true;

        let completed = 0;
        tls.current.forEach((tl) => tl.kill());
        tls.current = [];

        const stepAngle = getStepAngle(images);
        const degrees = Math.abs(step) * stepAngle;
        const direction = Math.sign(step);

        Object.values(pointsRef.current).forEach(point => {
          if (point) {
            point.classList.remove("active");
            gsap.to(point, {
              duration: DURATION,
              ease: "power1.out",
              css: { "--after-opacity": 0 },
            });
          }
        });

        images.forEach((img: Image, i: number) => {
          const point = pointsRef.current[img.id];
          if (!point) return;

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
            duration: DURATION,
            ease: "none",
            motionPath: { path, autoRotate: false },
            onComplete: () => {
              completed++;
              if (completed === images.length) {
                onRotateComplete(pointsRef.current);

                const points = Object.values(pointsRef.current);
                const activePoint = points.find((el) =>
                  el?.classList.contains("active")
                );

                if (activePoint) {
                  isActiveAnimationRef.current = true;
                  activePointRef.current = activePoint;
                  gsap.to(activePoint, {
                    delay: 0.1,
                    duration: 0.5,
                    css: { "--after-opacity": 1 },
                    ease: "power1.out",
                    onComplete: handleAnimationComplete,
                  });
                } else {
                  handleAnimationComplete();
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
        className={styles.circle}
        style={radius ? {
          width: `${radius*2}px`,
          height: `${radius*2}px`
        } : undefined}
      >
          {images.map((img: Image, i: number) => {
            const isActive = i === images.length - 1;
            const angle = ((360 / images.length) * i + initialAngle) % 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={img.id}
                className={`${styles.point} ${isActive ? styles.active : ""}`}
                ref={(el) => {
                  if (el) pointsRef.current[img.id] = el;
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                onClick={() => {
                  if (!isRotatingRef.current && !isActiveAnimationRef.current) {
                    onPointClick?.(img.id);
                  }
                }}
              >
                <img src={img.src} alt={`Logo ${img.id}`} />
                <span className={styles.label}>{String(img.src).slice(20, 34)}</span>
              </div>
            );
          })}
      </div>
    );
  }
);

export default WheelNav;

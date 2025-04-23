import { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { getStepAngle } from "../../../lib";
import { WheelNavProps, OrbitRef, PointRef } from "./types";
import { Point } from "../../../types/wheelNav";
import { PointImage } from "../PointImage";
import { PointDot } from "../PointDot";
import styles from "./WheelNav.module.scss";

gsap.registerPlugin(MotionPathPlugin);

const WheelNav = forwardRef<OrbitRef, WheelNavProps>(
  ({ 
    points, 
    onRotateComplete, 
    onPointClick, 
    activeItem,
    duration,
    radius, 
    initialAngle,
    customPoint: CustomPoint = PointDot,
    onAnimationComplete
  }, ref) => {
    const pointsRef = useRef<PointRef>({});
    const tls = useRef<gsap.core.Tween[]>([]);
    const isRotatingRef = useRef<boolean>(false);
    const isActiveAnimationRef = useRef<boolean>(false);
    const activePointRef = useRef<HTMLElement | null>(null);

    const handleAnimationComplete = () => {
      isRotatingRef.current = false;
      isActiveAnimationRef.current = false;
      activePointRef.current = null;
      onAnimationComplete?.();
    };

    useImperativeHandle(ref, () => ({
      rotate(step = 1) {
        if (isRotatingRef.current || isActiveAnimationRef.current) return;
        isRotatingRef.current = true;

        let completed = 0;
        tls.current.forEach((tl) => tl.kill());
        tls.current = [];

        const stepAngle = getStepAngle(points);
        const degrees = Math.abs(step) * stepAngle;
        const direction = Math.sign(step);

        Object.values(pointsRef.current).forEach(point => {
          if (point) {
            point.classList.remove("active");
            gsap.to(point, {
              duration: duration,
              ease: "power1.out",
              css: { "--after-opacity": 0 },
            });
          }
        });

        points.forEach((p: Point, i: number) => {
          const point = pointsRef.current[p.id];
          if (!point) return;

          const startAngle = ((360 / points.length) * i + initialAngle) % 360;
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
            duration: duration,
            ease: "none",
            motionPath: { path, autoRotate: false },
            onComplete: () => {
              completed++;
              if (completed === points.length) {
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
          {points.map((point: Point, i: number) => {
            const isActive = i === points.length - 1;
            const angle = ((360 / points.length) * i + initialAngle) % 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={point.id}
                className={`${styles.point} ${isActive ? styles.active : ""}`}
                ref={(el) => {
                  if (el) pointsRef.current[point.id] = el;
                }}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                onClick={() => {
                  if (!isRotatingRef.current && !isActiveAnimationRef.current) {
                    onPointClick?.(point.id);
                  }
                }}
              >
                <CustomPoint point={point} isActive={Number(point.id) == activeItem} />
                <span className={styles.label}>{point.title}</span>
              </div>
            );
          })}
      </div>
    );
  }
);

export default WheelNav;

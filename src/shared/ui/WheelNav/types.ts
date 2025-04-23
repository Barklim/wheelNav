import { Point } from "../../../types/wheelNav";
import { TInterval } from "../Intervals/types";

export interface PointRef {
  [key: string]: HTMLElement;
}

export interface WheelNavProps {
  points: Point[];
  onRotateComplete: (pointsRef: PointRef) => void;
  onPointClick: (clickedId: string) => void;
  duration: number;
  radius: number;
  initialAngle: number;
}

export interface OrbitRef {
  rotate: (step?: number) => void;
}

export interface WheelNavWrapperProps {
  initialPoints: Point[];
  duration?: number;
  radius?: number;
  initialAngle?: number;
  intervals?: TInterval;
} 
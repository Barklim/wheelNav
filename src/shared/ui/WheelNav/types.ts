import { Point } from "../../../types/wheelNav";
import { TInterval } from "../Intervals/types";
import { PointImgComponent } from "../PointImage/types";

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
  customPoint?: PointImgComponent;
}

export interface OrbitRef {
  rotate: (step?: number) => void;
}

export interface WheelNavWrapperProps {
  initialPoints: Point[];
  intervals?: TInterval;
  duration?: number;
  radius?: number;
  initialAngle?: number;
  customPoint?: PointImgComponent;
} 
import { Point } from "../../../types/wheelNav";
import { TInterval } from "../Intervals/types";
import { PointImgComponent } from "../PointImage/types";
import { PointDotComponent } from "../PointDot/types";
import { CrossLinesComponent } from "../CrossLines";

export interface PointRef {
  [key: string]: HTMLElement;
}

export interface WheelNavProps {
  points: Point[];
  onRotateComplete: (pointsRef: PointRef) => void;
  onPointClick: (clickedId: string) => void;
  activeItem: number;
  duration: number;
  radius: number;
  initialAngle: number;
  customPoint?: PointImgComponent | PointDotComponent;
  onAnimationComplete?: () => void;
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
  customPoint?: PointImgComponent | PointDotComponent;
  crossLines?: CrossLinesComponent;
  onActiveItemChange?: (activeItem: number) => void;
} 
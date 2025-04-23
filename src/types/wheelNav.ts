export interface Point {
  id: string;
  src: string;
  title?: string
}

export interface PointRef {
  [key: string]: HTMLElement;
}

export interface WheelNavProps {
  points: Point[];
  onRotateComplete: (pointsRef: PointRef) => void;
  onPointClick: (clickedId: string) => void;
  initialAngle?: number;
  radius: number;
  duration: number;
}

export interface OrbitRef {
  rotate: (step?: number) => void;
}

export interface WheelNavWrapperProps {
  initialPoints: Point[];
  radius?: number;
  duration?: number;
} 
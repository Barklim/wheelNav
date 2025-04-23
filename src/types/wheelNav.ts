export interface Image {
  id: string;
  src: string;
}

export interface PointRef {
  [key: string]: HTMLElement;
}

export interface WheelNavProps {
  images: Image[];
  onRotateComplete: (pointsRef: PointRef) => void;
  onPointClick: (clickedId: string) => void;
  initialAngle?: number;
  radius?: number;
}

export interface OrbitRef {
  rotate: (step?: number) => void;
}

export interface WheelNavWrapperProps {
  initialImages: Image[];
  radius?: number;
} 
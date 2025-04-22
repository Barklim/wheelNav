export interface Image {
  id: string;
  src: string;
}

export interface PointRef {
  [key: string]: HTMLElement;
}

export interface TestProps {
  images: Image[];
  onRotateComplete: (pointsRef: PointRef) => void;
  onPointClick: (clickedId: string) => void;
  initialAngle?: number;
}

export interface TestRef {
  rotate: (step?: number) => void;
} 
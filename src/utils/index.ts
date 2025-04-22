import { Image } from "../types/wheelNav";

type ImageItem = {
  id: string | number;
  [key: string]: any;
};

const rotateRight = function <T>(arr: T[], k: number): T[] {
  const n = arr.length;
  k = k % n;
  const rotated: T[] = new Array(n).fill(null) as T[];

  for (let i = 0; i < n; i++) {
    rotated[(i + k) % n] = arr[i];
  }

  return rotated;
};

export const rotate = function <T>(arr: T[], k: number): T[] {
  const length = arr.length;
  const rightKSteps = k > 0 ? k : length - Math.abs(k);
  return rotateRight(arr, rightKSteps);
};

export const getStepAngle = (images: Image[]): number => {
  return 360 / images.length;
}; 

export const getRotationStepsToActive = (
  images: ImageItem[],
  clickedId: string | number
): number => {
  for (let step = 1; step <= images.length; step++) {
    const rotatedClockwise = rotate([...images], step);
    if (rotatedClockwise[rotatedClockwise.length - 1].id === clickedId) {
      return step;
    }

    const rotatedCounterClockwise = rotate([...images], -step);
    if (
      rotatedCounterClockwise[rotatedCounterClockwise.length - 1].id ===
      clickedId
    ) {
      return -step;
    }
  }

  return 0;
};

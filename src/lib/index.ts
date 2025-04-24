import { Point } from "../types/wheelNav";

type PointItem = {
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

export const getStepAngle = (poins: Point[]): number => {
  return 360 / poins.length;
}; 

export const getRotationStepsToActive = (
  poins: PointItem[],
  clickedId: string | number
): number => {
  for (let step = 1; step <= poins.length; step++) {
    const rotatedClockwise = rotate([...poins], step);
    if (rotatedClockwise[rotatedClockwise.length - 1].id === clickedId) {
      return step;
    }

    const rotatedCounterClockwise = rotate([...poins], -step);
    if (
      rotatedCounterClockwise[rotatedCounterClockwise.length - 1].id ===
      clickedId
    ) {
      return -step;
    }
  }

  return 0;
};

export function excludeLast<T>(array: T[], n: number): T[] {
  return array.slice(0, -n);
}
const rotateRight = function (arr, k) {
  const n = arr.length;
  k = k % n;
  const rotated = new Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    rotated[(i + k) % n] = arr[i];
  }

  return rotated;
};

export const rotate = function (arr, k) {
  const length = arr.length;
  const rightKSteps = k > 0 ? k : length - Math.abs(k);
  return rotateRight(arr, rightKSteps);
};

export const getStepAngle = (arr) => Math.floor(360 / arr.length) || 0;

export const getRotationStepsToActive = (images, clickedId) => {
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

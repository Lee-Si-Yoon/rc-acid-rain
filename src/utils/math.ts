import { Coord } from "../components/canvas/types";

function isDifferenceLessThan(
  num1: number,
  num2: number,
  diff: number,
): boolean {
  if (diff <= 0) throw new Error("diff should be bigger than 0");
  return Math.abs(num1 > num2 ? num1 - num2 : num2 - num1) < diff;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const lerpRange = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number,
): number => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

/**
 * @url https://javascript.info/bezier-curve#maths
 */
const getPoint =
  (start: Coord, mid1: Coord, mid2: Coord, end: Coord) => (t: number) => {
    const x =
      (1 - t) ** 3 * start.x +
      3 * (1 - t) ** 2 * t * mid1.x +
      3 * (1 - t) * t ** 2 * mid2.x +
      t ** 3 * end.x;
    const y =
      (1 - t) ** 3 * start.y +
      3 * (1 - t) ** 2 * t * mid1.y +
      3 * (1 - t) * t ** 2 * mid2.y +
      t ** 3 * end.y;
    return { x, y };
  };

export {
  isDifferenceLessThan,
  getRandomArbitrary,
  lerp,
  lerpRange,
  getPoint,
  // getCubicBezier,
};

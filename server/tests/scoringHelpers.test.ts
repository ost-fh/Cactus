import {
  calculateAverage,
  calculateGini,
  sumOfArray,
} from "../services/scoringHelpers";

test("should sum up values correctly", () => {
  expect(sumOfArray([1, 2, 3, 4])).toBe(10);
  expect(sumOfArray([1])).toBe(1);
});

test("should calculate Gini correctly", () => {
  expect(calculateGini([5, 10, 15, 20, 50])).toBe(0.4);
  expect(calculateGini([1, 1, 1, 1, 1])).toBe(0);
  expect(calculateGini([0, 0, 0, 0, 1])).toBe(0.8);
});

test("should throw error", () => {
  expect(calculateGini([5, -10, 15, 20, 50])).toThrowError;
});

test("should calculate average correctly", () => {
  expect(calculateAverage([10, 10])).toBe(10);
  expect(calculateAverage([1, 10])).toBe(5.5);
  expect(calculateAverage([1])).toBe(1);
});

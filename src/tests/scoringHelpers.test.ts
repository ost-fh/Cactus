import {
  calculateAverage,
  calculateGini,
  combineCriteria,
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

test("should throw error because no negative values are allowed", () => {
  expect(() => {
    calculateGini([5, -10, 15, 20, 50]);
  }).toThrowError();
});

test("should calculate average correctly", () => {
  expect(calculateAverage([10, 10])).toBe(10);
  expect(calculateAverage([1, 10])).toBe(5.5);
  expect(calculateAverage([1])).toBe(1);
});

const criteria1 = {
  criterium_id: "1",
  positive: 1,
  negative: 0,
  notDecided: 0,
  _id: {
    $oid: "63a2430f3b7ad135db62656b",
  },
  agreementScore: 1,
};
const criteria2 = {
  criterium_id: "2",
  positive: 1,
  negative: 0,
  notDecided: 0,
  _id: {
    $oid: "63a2430f3b7ad135db62656c",
  },
  agreementScore: 1,
};
const criteria3 = {
  criterium_id: "1",
  positive: 1,
  negative: 0,
  notDecided: 0,
  _id: {
    $oid: "63a2430f3b7ad135db62656c",
  },
  agreementScore: 1,
};

test("should not combine criteria", () => {
  expect(() => combineCriteria(criteria1, criteria2)).toThrowError();
});

test("should combine criteria correctly", () => {
  expect(combineCriteria(criteria1, criteria3)).toEqual({
    criterium_id: "1",
    negative: 0,
    notDecided: 0,
    positive: 2,
  });
});

import {
  IAggregatedScoreSchema,
  ICriteriumSchema,
  ICriteriumScoreSchema,
} from "../models/libraryModel";

export const calculateAverage = (values: number[]): number => {
  const average = sumOfArray(values) / values.length;
  const result = isNaN(average) ? 0 : average;
  return result;
};

export const sumOfArray = (values: number[]): number => {
  return values.reduce((a, b) => a + b, 0);
};

export const calculateGini = (values: number[]) => {
  if (values.find((item) => item < 0)) {
    throw Error("no negative numbers allowed");
  }
  const sortedValues = values.sort((a, b) => a - b);
  const sum = sumOfArray(sortedValues);
  let positionTimesValue = 0;
  for (let i = 0; i < sortedValues.length; i++) {
    positionTimesValue += (i + 1) * sortedValues[i];
  }
  const gini =
    (2 * positionTimesValue - (sortedValues.length + 1) * sum) /
    (sortedValues.length * sum);
  return gini;
};

export const combinePerCriteria = (
  scorePerCriterium: ICriteriumScoreSchema[][]
): ICriteriumScoreSchema[] => {
  const results: ICriteriumScoreSchema[] = [];
  for (const test of scorePerCriterium) {
    for (const criterium of test) {
      const index = results.findIndex(
        (item) => item.criterium_id === criterium.criterium_id
      );
      // if id not in results, push
      if (index === -1) {
        results.push(criterium);
      }
      // if id in results, combine
      if (index > -1) {
        results[index] = combineCriteria(results[index], criterium);
      }
    }
  }
  return results;
};

// Calculates normalized Gini Coefficient as AgreementScore
export const calculateAgreementScores = (
  scoresPerCriterium: ICriteriumScoreSchema[]
) => {
  scoresPerCriterium.forEach((item) => {
    const giniArray = [item.positive, item.negative, item.notDecided];
    const giniResult = calculateGini(giniArray);
    const normalizingFactor = giniArray.length / (giniArray.length - 1);
    const normalizedGini = giniResult * normalizingFactor;
    item.agreementScore = normalizedGini;
  });
};

export const combineCriteria = (
  criterium1: ICriteriumScoreSchema,
  criterium2: ICriteriumScoreSchema
) => {
  if (criterium1.criterium_id !== criterium2.criterium_id) {
    throw new Error("different criteria are not combinable");
  }
  return {
    criterium_id: criterium1.criterium_id,
    positive: criterium1.positive + criterium2.positive,
    negative: criterium1.negative + criterium2.negative,
    notDecided: criterium1.notDecided + criterium2.notDecided,
  };
};

export const extractCriteria = (
  criterium: ICriteriumSchema
): ICriteriumScoreSchema => {
  const score = choiceToScore(criterium.choice);
  return {
    criterium_id: criterium.criterium_id,
    positive: score.positive,
    negative: score.negative,
    notDecided: score.notDecided,
  };
};

export const calculateScorePercentage = (
  score: IAggregatedScoreSchema
): number => {
  if (score.positive === 0 && score.negative === 0) {
    return 0;
  }
  const total = score.positive + score.negative;
  return Math.floor((score.positive * 100) / total);
};

export const combineScore = (
  scores: IAggregatedScoreSchema[]
): IAggregatedScoreSchema => {
  const resultingScore = {
    positive: 0,
    negative: 0,
    amountOfTests: 0,
    notDecided: 0,
  };
  scores.forEach((item) => {
    resultingScore.positive += item.positive;
    resultingScore.negative += item.negative;
    resultingScore.notDecided += item.notDecided;
    resultingScore.amountOfTests += item.amountOfTests;
  });

  // If the results of one test are combined, the amount of tests is set to 1
  if (resultingScore.amountOfTests === 0) {
    resultingScore.amountOfTests = 1;
  }
  return resultingScore;
};

export const choiceToScore = (choice: string): IAggregatedScoreSchema => {
  if (!(choice === "yes" || choice === "no" || choice === "not_decidable")) {
    console.error("invalid choice value: " + choice);
  }
  return {
    positive: choice === "yes" ? 1 : 0,
    negative: choice === "no" ? 1 : 0,
    notDecided: choice === "not_decidable" ? 1 : 0,
    amountOfTests: 0,
  };
};

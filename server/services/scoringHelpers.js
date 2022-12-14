const gini = require("gini");

const calculateAverage = (values) => {
  return values.reduce((a, b) => a + b, 0) / values.length;
};

const combinePerCriteria = (scorePerCriterium) => {
  const results = [];
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

// Calculates normalized Gini Coefficient
const calculateAgreementScores = (scoresPerCriterium) => {
  scoresPerCriterium.forEach((item) => {
    const giniArray = [item.positive, item.negative, item.notDecided];
    const giniResult = gini.unordered(giniArray);
    const normalizingFactor = giniArray.length / (giniArray.length - 1);
    const normalizedGini = giniResult * normalizingFactor;
    item.agreementScore = normalizedGini;
  });
};

const combineCriteria = (criterium1, criterium2) => {
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

const extractCriteria = (criterium) => {
  const score = choiceToScore(criterium.choice);
  return {
    criterium_id: criterium.criterium_id,
    positive: score.positive,
    negative: score.negative,
    notDecided: score.notDecided,
  };
};

const calculateScorePercentage = (score) => {
  const total = score.positive + score.negative;
  return Math.floor((score.positive * 100) / total);
};

const combineScore = (scores) => {
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

const choiceToScore = (choice) => {
  if (!(choice === "yes" || choice === "no" || choice === "not_decidable")) {
    console.error("invalid choice value");
  }
  return {
    positive: choice === "yes" ? 1 : 0,
    negative: choice === "no" ? 1 : 0,
    notDecided: choice === "not_decidable" ? 1 : 0,
    amountOfTests: 0,
  };
};

module.exports = {
  calculateAverage,
  combinePerCriteria,
  calculateAgreementScores,
  extractCriteria,
  calculateScorePercentage,
  combineScore,
  choiceToScore,
};

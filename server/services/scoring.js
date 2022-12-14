const { Library } = require("../models/libraryModel");
const {
  calculateAverage,
  combinePerCriteria,
  calculateAgreementScores,
  extractCriteria,
  calculateScorePercentage,
  combineScore,
  choiceToScore,
} = require("./scoringHelpers");

const scoreLibrary = async (libraryId) => {
  const library = await Library.findById(libraryId);
  console.log("scoring...");

  for (const version of library.versions) {
    for (const component of version.components) {
      for (const mode of component.modes) {
        for (const test of mode.tests) {
          scoreTest(test);
        }
        scoreMode(mode);
      }
      scoreComponent(component);
    }
    scoreVersion(version);
  }
  await library.save();
};

const scoreVersion = (version) => {
  // accessibilityScore
  version.accessibilityScore = calculateAverage(
    version.components.map((component) => component.accessibilityScore)
  );
  // agreementScore
  version.agreementScore = calculateAverage(
    version.components.map((component) => component.agreementScore)
  );
  // amountOfComponentsTested
  version.amountOfComponentsTested = version.components.length;
};

const scoreComponent = (component) => {
  // accessibilityScore
  component.accessibilityScore = calculateAverage(
    component.modes.map((mode) => mode.accessibilityScore)
  );

  // agreementScore
  component.agreementScore = calculateAverage(
    component.modes.map((mode) => mode.agreementScore)
  );

  // amountOfTests
  component.amountOfTests = component.modes
    .map((mode) => mode.testScores.amountOfTests)
    .reduce((a, b) => a + b, 0);
};

const scoreMode = (mode) => {
  // testScores
  mode.testScores = combineScore(
    mode.tests.map((test) => {
      return test.testScore;
    })
  );

  // accessibilityScore
  mode.accessibilityScore = calculateScorePercentage(mode.testScores);

  // scoresPerCriterium
  const scoresPerCriteriumRaw = mode.tests.map(
    (test) => test.scorePerCriterium
  );
  const scoresPerCriterium = combinePerCriteria(scoresPerCriteriumRaw);
  calculateAgreementScores(scoresPerCriterium);
  mode.scoresPerCriterium = scoresPerCriterium;

  // agreementScore
  mode.agreementScore = calculateAverage(
    scoresPerCriterium.map((score) => score.agreementScore)
  );
};

const scoreTest = (test) => {
  if (!test.testScore) {
    // testScore
    test.testScore = combineScore(
      test.criteria.map((criterium) => choiceToScore(criterium.choice))
    );

    // scorePerCriterium
    test.scorePerCriterium = test.criteria.map((criterium) =>
      extractCriteria(criterium)
    );
  }
};

module.exports = { scoreLibrary };

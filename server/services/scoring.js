import { libraryModel } from "../models/libraryModel.js";
import {
  calculateAverage,
  combinePerCriteria,
  calculateAgreementScores,
  extractCriteria,
  calculateScorePercentage,
  combineScore,
  choiceToScore,
} from "./scoringHelpers.js";

const AMOUNT_OF_MODES = 2;

export const scoreLibrary = async (libraryId) => {
  const library = await libraryModel.findById(libraryId);
  console.log(`SCORING ${library.title}, id: ${library._id}`);

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
  if (version.components.length > 0) {
    version.accessibilityScore = calculateAverage(
      version.components.map((component) => component.accessibilityScore)
    );
    // agreementScore
    version.agreementScore = calculateAverage(
      version.components.map((component) => component.agreementScore)
    );
    // amountOfComponentsTested
    version.amountOfComponentsTested = version.components.filter(
      (item) => item.componentTested === true
    ).length;
  }
};

const scoreComponent = (component) => {
  // accessibilityScore
  component.accessibilityScore = calculateAverage(
    component.modes.map((mode) => mode.accessibilityScore)
  );

  // agreementScore calculated directly from criterium scores -> weighted average
  component.agreementScore = calculateAverage(
    component.modes
      .map((mode) =>
        mode.scoresPerCriterium.map((score) => score.agreementScore)
      )
      .flat(1)
  );

  // accumulate amountOfTests
  component.amountOfTests = component.modes
    .map((mode) => mode.testScores.amountOfTests)
    .reduce((a, b) => a + b, 0);

  // mark component as tested, if all modes were tested
  if (component.modes.length === AMOUNT_OF_MODES) {
    component.componentTested = true;
  } else {
    component.componentTested = false;
  }
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
    // calculate testScore from all criteria
    test.testScore = combineScore(
      test.criteria.map((criterium) => choiceToScore(criterium.choice))
    );

    // calculate scorePerCriterium for agreement Score
    test.scorePerCriterium = test.criteria.map((criterium) =>
      extractCriteria(criterium)
    );
  }
};

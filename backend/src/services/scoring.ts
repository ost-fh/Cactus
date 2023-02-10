import {
  IAggregatedScoreSchema,
  IComponentSchema,
  ICriteriumScoreSchema,
  ILibrary,
  IModeSchema,
  ITestSchema,
  IVersion,
  libraryModel,
} from "../models/libraryModel";
import {
  calculateAverage,
  combinePerCriteria,
  calculateAgreementScores,
  extractCriteria,
  calculateScorePercentage,
  combineScore,
  choiceToScore,
} from "./scoringHelpers";

const AMOUNT_OF_MODES = 2;

export const scoreLibrary = async (libraryId: string) => {
  try {
    const library = await libraryModel.findById(libraryId);
    if (library) {
      console.log(`SCORING ${library.title}, id: ${library._id}`);
      runScoring(library);
      await library.save();
    }
  } catch (error) {
    console.error(error);
  }
};

export const runScoring = (library: ILibrary) => {
  if (library.versions) {
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
  }
};

const scoreTest = (test: ITestSchema) => {
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

const scoreMode = (mode: IModeSchema) => {
  // testScores
  mode.testScores = combineScore(
    mode.tests
      .map((test) => {
        return test.testScore;
      })
      .filter((item): item is IAggregatedScoreSchema => item !== undefined)
  );

  // accessibilityScore
  mode.accessibilityScore = calculateScorePercentage(mode.testScores);

  // scoresPerCriterium
  const scoresPerCriteriumRaw = mode.tests
    .map((test) => test.scorePerCriterium)
    .filter((item): item is ICriteriumScoreSchema[] => item !== undefined);
  const scoresPerCriterium = combinePerCriteria(scoresPerCriteriumRaw);
  calculateAgreementScores(scoresPerCriterium);
  mode.scoresPerCriterium = scoresPerCriterium;

  // agreementScore
  mode.agreementScore = calculateAverage(
    scoresPerCriterium
      .map((score) => score.agreementScore)
      .filter((item): item is number => item !== undefined)
  );
};

const scoreComponent = (component: IComponentSchema) => {
  // accessibilityScore
  component.accessibilityScore = calculateAverage(
    component.modes
      .map((mode) => mode.accessibilityScore)
      .filter((item): item is number => item !== undefined)
  );

  // agreementScore calculated directly from criterium scores -> weighted average
  component.agreementScore = calculateAverage(
    component.modes
      .map((mode) =>
        mode.scoresPerCriterium!.map((score) => score.agreementScore)
      )
      .flat(1)
      .filter((item): item is number => item !== undefined)
  );

  // accumulate amountOfTests
  component.amountOfTests = component.modes
    .map((mode) => mode.testScores!.amountOfTests)
    .reduce((a, b) => a + b, 0);

  // mark component as tested, if all modes were tested
  if (component.modes.length === AMOUNT_OF_MODES) {
    component.componentTested = true;
  } else {
    component.componentTested = false;
  }
};

const scoreVersion = (version: IVersion) => {
  // accessibilityScore
  if (version.components.length > 0) {
    const accessibilityScores = version.components
      .map((component) => component.accessibilityScore)
      .filter((item): item is number => item !== undefined);

    version.accessibilityScore = calculateAverage(accessibilityScores);

    // agreementScore
    version.agreementScore = calculateAverage(
      version.components
        .map((component) => component.agreementScore)
        .filter((item): item is number => item !== undefined)
    );

    // amountOfComponentsTested
    version.amountOfComponentsTested = version.components.filter(
      (item) => item.componentTested === true
    ).length;
  }
};

import { Injectable } from '@nestjs/common';
import {
  calculateAgreementScores,
  calculateAverage,
  calculateScorePercentage,
  choiceToScore,
  combinePerCriteria,
  combineScore,
  extractCriteria,
} from './scoring-helpers';
import AggregatedScore from 'src/libraries/models/aggregated-score.schema';
import LibraryVersion from 'src/libraries/models/library-version.schema';
import { LibraryDocument } from 'src/libraries/models/library.schema';
import TestResult from 'src/libraries/models/test-result.schema';
import TestMode from 'src/libraries/models/test-mode.schema';
import CriteriumScore from 'src/libraries/models/criterium-score.schema';
import LibraryComponent from 'src/libraries/models/library-component.schema';
import { LibraryService } from 'src/libraries/libraries.service';

@Injectable()
export class ScoringService {
  private AMOUNT_OF_MODES = 2; // TODO refactor

  constructor(private readonly libraryService: LibraryService) {}

  async scoreLibrary(libraryId: string): Promise<LibraryDocument> {
    try {
      const library = await this.libraryService.findOne(libraryId);
      if (!library) {
        throw new Error();
      }
      console.log(`SCORING ${library.title}, id: ${library._id}`);
      this.runScoring(library);
      return library.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public runScoring(library: LibraryDocument) {
    if (library.versions) {
      for (const version of library.versions) {
        for (const component of version.components) {
          for (const mode of component.modes) {
            for (const test of mode.tests) {
              this.scoreTest(test);
            }
            this.scoreMode(mode);
          }
          this.scoreComponent(component);
        }
        this.scoreVersion(version);
      }
    }
  }

  private scoreTest(test: TestResult) {
    if (!test.testScore) {
      // calculate testScore from all criteria
      test.testScore = combineScore(
        test.criteria.map((criterium) => choiceToScore(criterium.choice)),
      );

      // calculate scorePerCriterium for agreement Score
      test.scorePerCriterium = test.criteria.map((criterium) =>
        extractCriteria(criterium),
      );
    }
  }

  private scoreMode(mode: TestMode) {
    // testScores
    mode.testScores = combineScore(
      mode.tests
        .map((test) => {
          return test.testScore;
        })
        .filter((item): item is AggregatedScore => item !== undefined),
    );

    // accessibilityScore
    mode.accessibilityScore = calculateScorePercentage(mode.testScores);

    // scoresPerCriterium
    const scoresPerCriteriumRaw = mode.tests
      .map((test) => test.scorePerCriterium)
      .filter((item): item is CriteriumScore[] => item !== undefined);
    const scoresPerCriterium = combinePerCriteria(scoresPerCriteriumRaw);
    calculateAgreementScores(scoresPerCriterium);
    mode.scoresPerCriterium = scoresPerCriterium;

    // agreementScore
    mode.agreementScore = calculateAverage(
      scoresPerCriterium
        .map((score) => score.agreementScore)
        .filter((item): item is number => item !== undefined),
    );
  }

  private scoreComponent(component: LibraryComponent) {
    // accessibilityScore
    component.accessibilityScore = calculateAverage(
      component.modes
        .map((mode) => mode.accessibilityScore)
        .filter((item): item is number => item !== undefined),
    );

    // agreementScore calculated directly from criterium scores -> weighted average
    component.agreementScore = calculateAverage(
      component.modes
        .map((mode) =>
          mode.scoresPerCriterium!.map((score) => score.agreementScore),
        )
        .flat(1)
        .filter((item): item is number => item !== undefined),
    );

    // accumulate amountOfTests
    component.amountOfTests = component.modes
      .map((mode) => mode.testScores!.amountOfTests)
      .reduce((a, b) => a + b, 0);

    // mark component as tested, if all modes were tested
    if (component.modes.length === this.AMOUNT_OF_MODES) {
      component.componentTested = true;
    } else {
      component.componentTested = false;
    }
  }

  private scoreVersion(version: LibraryVersion) {
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
          .filter((item): item is number => item !== undefined),
      );

      // amountOfComponentsTested
      version.amountOfComponentsTested = version.components.filter(
        (item) => item.componentTested === true,
      ).length;
    }
  }
}

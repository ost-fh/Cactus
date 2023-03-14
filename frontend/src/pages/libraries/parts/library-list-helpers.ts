import { library, version } from "../../../shared/resources/types";

export interface focusScore {
  library_id: string;
  score: string;
}

export const calculateFocusScore = (
  filters: string[],
  currentVersion: version
): string => {
  let result: string | undefined = undefined;
  let scores: number[] = [];
  let untested: number = 0;
  for (const filter of filters) {
    const component = currentVersion?.components.find(
      (component) => component.name === filter
    );
    component ? scores.push(component.accessibilityScore) : untested++;
  }
  if (untested === 0) {
    const average = calculateAverage(scores);
    result = Math.floor(average).toString();
  } else {
    result = calculateMinMaxScore(scores, untested);
  }

  return result || "hi";
};

const calculateMinMaxScore = (scores: number[], untested: number): string => {
  let minScores = [...scores];
  for (let i = 0; i < untested; i++) {
    scores.push(100);
    minScores.push(0);
  }
  const min = calculateAverage(scores);
  const max = calculateAverage(minScores);
  return `${Math.floor(max)} - ${Math.floor(min)}`;
};

const calculateAverage = (array: number[]): number => {
  return array.reduce((a, b) => a + b, 0) / array.length;
};

export enum filterResults {
  true,
  neutral,
  false,
}

export type LibraryBuckets = {
  noFilter: library[];
  trueFiltered: library[];
  neutralFiltered: library[];
  falseFiltered: library[];
  focusScores: focusScore[];
};

export const sortLibrariesIntoBuckets = (
  libraries: library[],
  filters: string[]
): LibraryBuckets => {
  let noFilters: library[] = [];
  let trueFiltered: library[] = [];
  let neutralFiltered: library[] = [];
  let falseFiltered: library[] = [];
  let focusScores: focusScore[] = [];

  if (filters.length === 0) {
    noFilters = libraries;
  } else {
    libraries.forEach((library) => {
      // standard filter true
      let filterResult: filterResults = filterResults.true;

      // get data from current version
      const currentVersion = library.versions.find(
        (version) => library.currentVersion === version.version
      );

      // if a component from the filters is not found, it sorts into neutral
      for (const filter of filters) {
        if (
          !currentVersion?.components.find(
            (component) => component.name === filter
          )
        ) {
          filterResult = filterResults.neutral;
          break;
          // TODO -> differentiate between completed and not completly tested component
        }
        // TODO later differentiate component exists/does not exist
      }

      if (currentVersion) {
        focusScores.push({
          library_id: library._id,
          score: calculateFocusScore(filters, currentVersion),
        });
      }

      // sort into buckets
      if (filterResult === filterResults.true) {
        trueFiltered.push(library);
      }
      if (filterResult === filterResults.neutral) {
        neutralFiltered.push(library);
      }
      // TODO Enable once exclusion is implemented
      // if (filterResult === filterResults.false) {
      //   falseTemp = [...falseTemp, library];
      // }
    });
  }

  // sorting TODO

  const buckets: LibraryBuckets = {
    noFilter: noFilters,
    trueFiltered: trueFiltered,
    neutralFiltered: neutralFiltered,
    falseFiltered: falseFiltered,
    focusScores: focusScores,
  };
  return buckets;
};

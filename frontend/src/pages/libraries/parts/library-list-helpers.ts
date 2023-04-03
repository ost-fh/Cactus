import {
  getCurrentVersion,
  Library,
  Version,
} from "../../../shared/resources/types";

export interface focusScore {
  library_id: string;
  score: string;
}

export const calculateFocusScore = (
  filters: string[],
  currentVersion: Version
): string => {
  let result: string | undefined = undefined;
  let scores: number[] = [];
  let untested: number = 0;
  for (const filter of filters) {
    const component = currentVersion?.components.find(
      (component) => component.name === filter
    );
    component && component.exists
      ? scores.push(component.accessibilityScore)
      : untested++;
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
  noFilter: Library[];
  trueFiltered: Library[];
  neutralFiltered: Library[];
  falseFiltered: Library[];
  focusScores: focusScore[];
};

export const sortLibrariesIntoBuckets = (
  libraries: Library[],
  sortBy: string,
  filters: string[]
): LibraryBuckets => {
  let noFilters: Library[] = [];
  let trueFiltered: Library[] = [];
  let neutralFiltered: Library[] = [];
  let falseFiltered: Library[] = [];
  let focusScores: focusScore[] = [];

  if (filters.length === 0) {
    noFilters = libraries;
  } else {
    libraries.forEach((library) => {
      let filterResult: filterResults = filterResults.true;

      // get data from current version
      const currentVersion = getCurrentVersion(library);

      // if a component from the filters is not found, it sorts into neutral
      for (const filter of filters) {
        const component = currentVersion?.components.find(
          (component) => component.name === filter
        );
        if (!component) {
          filterResult = filterResults.neutral;
        }
        if (
          component &&
          component.exists === true &&
          component.componentTested === false
        ) {
          filterResult = filterResults.neutral;
        }
        if (component && component.exists === false) {
          filterResult = filterResults.false;
          break;
        }
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
      if (filterResult === filterResults.false) {
        falseFiltered.push(library);
      }
    });
  }

  sortLibraryArray(noFilters, sortBy);
  sortLibraryArray(trueFiltered, sortBy);
  sortLibraryArray(neutralFiltered, sortBy);
  sortLibraryArray(falseFiltered, sortBy);

  const buckets: LibraryBuckets = {
    noFilter: noFilters,
    trueFiltered: trueFiltered,
    neutralFiltered: neutralFiltered,
    falseFiltered: falseFiltered,
    focusScores: focusScores,
  };
  return buckets;
};

const sortLibraryArray = (libraryArray: Library[], sortBy: string) => {
  sortBy = sortBy.toLowerCase();
  if (sortBy === "score") {
    libraryArray.sort((a, b) => {
      const aCurrentVersion = getCurrentVersion(a);
      const bCurrentVersion = getCurrentVersion(b);
      return (
        (bCurrentVersion?.accessibilityScore || 0) -
        (aCurrentVersion?.accessibilityScore || 0)
      );
    });
  } else if (sortBy === "name") {
    libraryArray.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      if (aTitle > bTitle) {
        return 1;
      }
      if (aTitle < bTitle) {
        return -1;
      }
      return 0;
    });
  } else {
    console.error("invalid sort parameter");
    return libraryArray;
  }
};

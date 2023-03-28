import { getComponent, Version } from "../../../shared/resources/types";

export type filterScore = {
  name: string;
  filterState: "true" | "incomplete" | "neutral" | "false";
  score?: number;
};

export const createFilterScores = (filters: string[], version: Version) => {
  const filterScores: filterScore[] = [];
  filters.forEach((filter) => {
    const component = getComponent(filter, version);
    if (
      component &&
      component.exists === true &&
      component.componentTested === true
    ) {
      const newFilterScore: filterScore = {
        name: filter,
        filterState: "true",
        score: component.accessibilityScore,
      };
      filterScores.push(newFilterScore);
    } else if (
      component &&
      component.exists === true &&
      component.componentTested === false
    ) {
      const newFilterScore: filterScore = {
        name: filter,
        filterState: "incomplete",
      };
      filterScores.push(newFilterScore);
    } else if (component && component.exists === false) {
      const newFilterScore: filterScore = {
        name: filter,
        filterState: "false",
      };
      filterScores.push(newFilterScore);
    } else {
      const newFilterScore: filterScore = {
        name: filter,
        filterState: "neutral",
      };
      filterScores.push(newFilterScore);
    }
  });
  return filterScores;
};

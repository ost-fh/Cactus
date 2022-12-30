export type criteriumScore = {
  criterium_id: string;
  positive: number;
  negative: number;
  notDecided: number;
  agreementScore: number;
};

export type aggregatedScore = {
  positive: number;
  negative: number;
  notDecided: number;
  amountOfTests: number;
};

export type library = {
  _id: string;
  title: string;
  currentVersion: string;
  versions: version[];
  // merge with library detail type
  linkHome: string;
  linkDocs: string;
};

export type newLibrary = {
  title: string;
  currentVersion: string;
  linkHome: string;
  linkDocs: string;
};

export type version = {
  version: string;
  components: component[];
  accessibilityScore?: number;
  agreementScore?: number;
  amountOfComponentsTested?: number;
};

export type component = {
  name: string;
  alternativeComponentNames: string;
  modes: mode[];
  accessibilityScore: number;
  agreementScore: number;
  amountOfTests: number;
};

export type mode = {
  name: string;
  tests: test[];
  scoresPerCriterium: criteriumScore[];
  accessibilityScore: number;
  agreementScore: number;
  testScores: aggregatedScore;
};

export type test = {
  testedBy: string;
  criteria: criteriumResult[];
  testScore: aggregatedScore;
};

// Test / Criteria Data

export type testData = {
  libraryId: string;
  libraryVersion: string;
  component: string;
  alternativeComponentNames: string;
  testMode: string;
};

export type componentCriteria = {
  component: string;
  alternativeComponentNames: string;
  criteria: criteriaGroup[];
};

export type criteriaGroup = {
  testMode: string;
  instructions: string;
  videoLink: string;
  additionalHint: string;
  criteria: criterium[];
};

export type criterium = {
  _id: string;
  text: string;
  help: string;
};

export type criteriumResult = {
  _id: string;
  text: string;
  help: string;
  choice: string;
  comment: string;
};

export type testResultTransmission = {
  testData: testData;
  criteria: criteriumResult[];
};

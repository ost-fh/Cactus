export type CriteriumScore = {
  criterium_id: string;
  positive: number;
  negative: number;
  notDecided: number;
  agreementScore: number;
};

export type AggregatedScore = {
  positive: number;
  negative: number;
  notDecided: number;
  amountOfTests: number;
};

export type Library = {
  _id: string;
  title: string;
  currentVersion: string;
  versions: Version[];
  linkHome: string;
  linkDocs: string;
};

export const getCurrentVersion = (library: Library): Version | undefined => {
  return getVersion(library, library.currentVersion);
};

export const getVersion = (
  library: Library,
  demandedVersion: string
): Version | undefined => {
  return library.versions.find(
    (version) => demandedVersion === version.version
  );
};

export type NewLibrary = {
  title: string;
  currentVersion: string;
  linkHome: string;
  linkDocs: string;
};

export type Version = {
  version: string;
  components: Component[];
  accessibilityScore?: number;
  agreementScore?: number;
  amountOfComponentsTested?: number;
};

export type Component = {
  name: string;
  alternativeComponentNames: string;
  modes: mode[];
  accessibilityScore: number;
  agreementScore: number;
  amountOfTests: number;
  linkDocs?: string;
  exists?: boolean;
  componentTested: boolean;
};

export const getComponent = (
  name: string,
  version: Version | undefined
): Component | undefined => {
  if (version) {
    return version.components.find((component) => component.name === name);
  }
};

export type mode = {
  name: string;
  tests: string[]; // _id of tests
  scoresPerCriterium: CriteriumScore[];
  accessibilityScore: number;
  agreementScore: number;
  testScores: AggregatedScore;
  _id: string;
};

export type test = {
  testedBy: string;
  criteria: CriteriumResult[];
  testScore: AggregatedScore;
  testMode: string; // id of the "parental" testmode item
  _id: string;
};

// Test / Criteria Data

export type TestData = {
  libraryId: string;
  libraryVersion: string;
  component: string;
  alternativeComponentNames: string;
  testMode: string;
  componentLinkDocs: string;
  componentExists: boolean;
  userOs: string;
  userBrowser: string;
};

export type ComponentCriteria = {
  name: string;
  alternativeComponentNames: string;
  description: string;
  imageUrl: string;
  testModes: CriteriaGroup[];
};

export type CriteriaGroup = {
  testMode: string;
  additionalHint?: string;
  criteria: Criterium[];
};

export type Criterium = {
  _id: string;
  title: string;
  help: string;
  sources?: string[];
};

export type CriteriumResult = {
  _id: string;
  title: string;
  help: string;
  choice: string;
  comment: string;
};

export type TestResultTransmission = {
  testData: TestData;
  criteria: CriteriumResult[];
};

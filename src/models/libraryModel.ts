import mongoose from "mongoose";

// Scoring
export interface ICriteriumScoreSchema {
  criterium_id: string;
  positive: number;
  negative: number;
  notDecided: number;
  agreementScore?: number;
}

const criteriumScoreSchema = new mongoose.Schema<ICriteriumScoreSchema>({
  criterium_id: String,
  positive: Number,
  negative: Number,
  notDecided: Number,
  agreementScore: Number,
});

export interface IAggregatedScoreSchema {
  positive: number;
  negative: number;
  notDecided: number;
  amountOfTests: number;
}

const aggregatedScoreSchema = new mongoose.Schema<IAggregatedScoreSchema>({
  positive: Number,
  negative: Number,
  notDecided: Number,
  amountOfTests: Number,
});

// Testresultdata

export interface ICriteriumSchema {
  criterium_id: string;
  text: string;
  help: string;
  choice: string;
  comment: string;
}

const criteriumSchema = new mongoose.Schema<ICriteriumSchema>({
  criterium_id: String,
  text: String,
  help: String,
  choice: String,
  comment: String,
});

export interface ITestSchema {
  testedBy: string;
  userOs: string;
  userBrowser: string;
  criteria: ICriteriumSchema[];
  testScore?: IAggregatedScoreSchema;
  scorePerCriterium?: ICriteriumScoreSchema[];
}

const testSchema = new mongoose.Schema<ITestSchema>({
  testedBy: {
    type: String,
    required: true,
  },
  userBrowser: String,
  userOs: String,
  criteria: [criteriumSchema],
  testScore: aggregatedScoreSchema,
  scorePerCriterium: [criteriumScoreSchema],
});

export interface IModeSchema {
  name: string;
  tests: ITestSchema[];
  testScores?: IAggregatedScoreSchema;
  scoresPerCriterium?: ICriteriumScoreSchema[];
  accessibilityScore?: number;
  agreementScore?: number;
}

const modeSchema = new mongoose.Schema<IModeSchema>({
  name: {
    type: String,
    required: true,
  },
  tests: [testSchema],
  testScores: aggregatedScoreSchema,
  scoresPerCriterium: [criteriumScoreSchema],
  accessibilityScore: Number,
  agreementScore: Number,
});

export interface IComponentSchema {
  name: string;
  alternativeComponentNames: string;
  modes: IModeSchema[];
  accessibilityScore?: number;
  agreementScore?: number;
  amountOfTests?: number;
  componentTested?: boolean;
}

const componentSchema = new mongoose.Schema<IComponentSchema>({
  name: {
    type: String,
    required: true,
  },
  alternativeComponentNames: String,
  modes: [modeSchema],
  accessibilityScore: Number,
  agreementScore: Number,
  amountOfTests: Number,
  componentTested: Boolean,
});

export interface IVersion {
  version: string;
  components: IComponentSchema[];
  accessibilityScore?: number;
  agreementScore?: number;
  amountOfComponentsTested?: number;
}

const versionSchema = new mongoose.Schema<IVersion>({
  version: {
    type: String,
    required: true,
  },
  components: [componentSchema],
  accessibilityScore: Number,
  agreementScore: Number,
  amountOfComponentsTested: Number,
});

export interface ILibrary {
  title: string;
  linkHome: string;
  linkDocs: string;
  currentVersion: string;
  versions: IVersion[];
}

const librarySchema = new mongoose.Schema<ILibrary>(
  {
    title: {
      type: String,
      required: true,
    },
    linkHome: {
      type: String,
      required: true,
    },
    linkDocs: {
      type: String,
      required: true,
    },
    currentVersion: {
      type: String,
      required: true,
    },
    versions: [versionSchema],
  },
  {
    timestamps: true,
  }
);

export const libraryModel = mongoose.model("Library", librarySchema);
export const versionModel = mongoose.model("Version", versionSchema);
export const criteriumModel = mongoose.model("Criterium", criteriumSchema);

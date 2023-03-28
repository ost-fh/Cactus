export default interface Component {
  name: string;
  alternativeComponentNames?: string;
  description: string;
  imageUrl: string;
  testModes: TestMode[];
}

export type TestMode = {
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

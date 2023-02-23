export default interface Component {
  component: string;
  alternativeComponentNames: string;
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
  text: string;
  help: string;
};

import { ILibrary } from "../models/libraryModel";
import { runScoring } from "../services/scoring";
import { testLibrary } from "./testlibrary-unscored";

test("should score library correctly", () => {
  const library: ILibrary = testLibrary;
  runScoring(library);
  expect(library.versions[0].accessibilityScore).toEqual(62.5);
  expect(library.versions[0].agreementScore).toEqual(0.8333333333333334);
});

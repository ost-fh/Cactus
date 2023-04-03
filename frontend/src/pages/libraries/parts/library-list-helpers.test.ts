import { Library, Version } from "../../../shared/resources/types";
import {
  calculateFocusScore,
  sortLibrariesIntoBuckets,
} from "./library-list-helpers";

describe("#calculateFocusScore", () => {
  test("Single tested component returns average score", () => {
    // Arrange
    console.log("Single tested component returns average score");

    const version: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 5,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
        {
          name: "e",
          alternativeComponentNames: "fg",
          modes: [],
          accessibilityScore: 3,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
      ],
    };

    // Act
    const result = calculateFocusScore(["a"], version);

    // Assert
    expect(result).toBe("5");
  });

  test("Multiple tested components returns average score", () => {
    // Arrange
    const version: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 5,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
        {
          name: "e",
          alternativeComponentNames: "fg",
          modes: [],
          accessibilityScore: 3,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
      ],
    };

    // Act
    const result = calculateFocusScore(["a", "e"], version);

    // Assert
    expect(result).toBe("4");
  });

  test("Partial untested components returns min max range score", () => {
    // Arrange
    const version: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 5,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
        {
          name: "e",
          alternativeComponentNames: "fg",
          modes: [],
          accessibilityScore: 1,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
      ],
    };

    // Act
    const result = calculateFocusScore(["a", "d"], version);

    // Assert
    expect(result).toBe("2 - 52");
  });

  test("No tested component returns min max range score", () => {
    // Arrange
    const version: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 5,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
        {
          name: "e",
          alternativeComponentNames: "fg",
          modes: [],
          accessibilityScore: 1,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
      ],
    };

    // Act
    const result = calculateFocusScore(["b", "c"], version);

    // Assert
    expect(result).toBe("0 - 100");
  });
});

describe("#sortLibrariesIntoBuckets", () => {
  test("Only filtered components should be included in focus score", () => {
    // Arrange
    const lib1: Library = {
      _id: "id1",
      title: "Library 1",
      currentVersion: "v1",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "tooltip",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "switch",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 3,
        },
        { version: "v1", components: [], accessibilityScore: 7 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    const lib2: Library = {
      _id: "id2",
      title: "Library 2",
      currentVersion: "v2",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "switch",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "button",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 10,
        },
        { version: "v1", components: [], accessibilityScore: 20 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    // Act
    const result = sortLibrariesIntoBuckets([lib1, lib2], "score", [
      "switch",
      "tooltip",
    ]);

    // Assert
    expect(result).toEqual({
      noFilter: [],
      trueFiltered: [],
      neutralFiltered: [lib2, lib1],
      falseFiltered: [],
      focusScores: [
        {
          library_id: "id1",
          score: "0 - 100",
        },
        {
          library_id: "id2",
          score: "2 - 52",
        },
      ],
    });
  });

  test("Library list without a filter returns sorted by name in noFilter", () => {
    // Arrange
    const lib1: Library = {
      _id: "id1",
      title: "Library 1",
      currentVersion: "v1",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "tooltip",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "switch",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 3,
        },
        { version: "v1", components: [], accessibilityScore: 7 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    const lib2: Library = {
      _id: "id2",
      title: "Library 2",
      currentVersion: "v2",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "switch",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "button",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 10,
        },
        { version: "v1", components: [], accessibilityScore: 20 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    // Act
    const result = sortLibrariesIntoBuckets([lib2, lib1], "name", []);

    // Assert
    expect(result).toEqual({
      noFilter: [lib1, lib2],
      trueFiltered: [],
      neutralFiltered: [],
      falseFiltered: [],
      focusScores: [],
    });
  });

  test("Libraries without filtered components results in falseFiltered", () => {
    // Arrange
    const lib1: Library = {
      _id: "id1",
      title: "Library 1",
      currentVersion: "v1",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "tooltip",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "switch",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 3,
        },
        { version: "v1", components: [], accessibilityScore: 7 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    const lib2: Library = {
      _id: "id2",
      title: "Library 2",
      currentVersion: "v2",
      versions: [
        {
          version: "v2",
          components: [
            {
              name: "switch",
              alternativeComponentNames: "bc",
              modes: [],
              accessibilityScore: 5,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
            {
              name: "button",
              alternativeComponentNames: "fg",
              modes: [],
              accessibilityScore: 1,
              agreementScore: 1,
              amountOfTests: 2,
              componentTested: true,
            },
          ],
          accessibilityScore: 10,
        },
        { version: "v1", components: [], accessibilityScore: 20 },
      ],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    // Act
    const result = sortLibrariesIntoBuckets([lib2, lib1], "name", ["button"]);

    // Assert
    expect(result).toEqual({
      noFilter: [],
      trueFiltered: [lib2],
      neutralFiltered: [lib1],
      falseFiltered: [],
      focusScores: [
        {
          library_id: "id2",
          score: "1",
        },
        {
          library_id: "id1",
          score: "0 - 100",
        },
      ],
    });
  });
});

export {};

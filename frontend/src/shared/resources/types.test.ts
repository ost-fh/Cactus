import { getComponent, getCurrentVersion, Library, Version } from "./types";

describe("#getCurrentVersion", () => {
  test("Returns current version", () => {
    // Arrange
    const currentVersion = { version: "v1", components: [] };
    const lib: Library = {
      _id: "id1",
      title: "lib1",
      currentVersion: currentVersion.version,
      versions: [{ version: "v2", components: [] }, currentVersion],
      linkHome: "https://example.com",
      linkDocs: "https://example.com/docs",
    };

    // Act
    const result = getCurrentVersion(lib);

    // Assert
    expect(result).toEqual(currentVersion);
  });
});

describe("#getComponent", () => {
  test("Returns version", () => {
    // Arrange
    const component = {
      name: "e",
      alternativeComponentNames: "fg",
      modes: [],
      accessibilityScore: 0,
      agreementScore: 1,
      amountOfTests: 2,
      componentTested: true,
    };
    const lib: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 0,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },
        component
      ],
    };

    // Act
    const result = getComponent(component.name, lib);

    // Assert
    expect(result).toEqual(component);
  });

  test("Returns undefined", () => {
    const component = 'i'
    const lib: Version = {
      version: "v2",
      components: [
        {
          name: "a",
          alternativeComponentNames: "bc",
          modes: [],
          accessibilityScore: 0,
          agreementScore: 1,
          amountOfTests: 2,
          componentTested: true,
        },{
      name: "e",
      alternativeComponentNames: "fg",
      modes: [],
      accessibilityScore: 0,
      agreementScore: 1,
      amountOfTests: 2,
      componentTested: true,
    }
      ],
    };

    const result = getComponent(component, lib);

    expect(result).toBeUndefined();
  });
});

export {};

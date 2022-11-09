
export type library = {
    _id: string,
    title: string,
    componentsTested: number,
    totalScore: number,
    currentVersion: String,
    testsByVersion: version[],
    // merge with library detail type
    linkHome: string;
    linkDocs: string;
}

export type newLibrary = {
    title: string;
    currentVersion: string;
    linkHome: string;
    linkDocs: string;
};

export type version = {
    version: string,
    tests: component[],
}

export type component = {
    // result groups: screenreader, keyboard., dann resultate mit ergebnissen und kommentaren
}
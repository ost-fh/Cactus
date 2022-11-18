export type library = {
    _id: string;
    title: string;
    componentsTested: number;
    totalScore: number;
    currentVersion: String;
    testsByVersion: version[];
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
    tests: component[];
};

export type component = {
    // result groups: screenreader, keyboard., dann resultate mit ergebnissen und kommentaren
};

// Test / Criteria Data

export type testData = {
    libraryId: string;
    libraryVersion: string;
    component: string;
    testMode: string;
    criteriaGroup: criteriaGroup | undefined;
};

export type componentCriteria = {
    component: string;
    criteria: criteriaGroup[];
    // screenreaderCriteria: criteriaGroup;
    // keyboardCriteria: criteriaGroup;
};

export type criteriaGroup = {
    testMode: string
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

export type testResults = {
    testedBy: string
    testedOn: Date
    // ...
}

export const criteriaCatalogue: componentCriteria[] = [
    {
        component: "Dialog",
        criteria: [
            {
                testMode: "Screenreader",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [{
                    _id: "123",
                    text: "focus style is visible",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "1243",
                    text: "buttons are focusable",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "12325",
                    text: "Other Things are focusable",
                    help: "Hier steht hilfetext",
                },]
            },
            {
                testMode: "Keyboard",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [{
                    _id: "123",
                    text: "focus style is visible",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "1243",
                    text: "buttons are focusable",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "12325",
                    text: "Other Things are focusable",
                    help: "Hier steht hilfetext",
                },]
            },

        ]
    },
    {
        component: "Accordion",
        criteria: [
            {
                testMode: "Screenreader",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [{
                    _id: "123",
                    text: "focus style is visible",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "1243",
                    text: "buttons are focusable",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "12325",
                    text: "Other Things are focusable",
                    help: "Hier steht hilfetext",
                },]
            },
            {
                testMode: "Keyboard",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [{
                    _id: "123",
                    text: "focus style is visible",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "1243",
                    text: "buttons are focusable",
                    help: "Hier steht hilfetext",
                },
                {
                    _id: "12325",
                    text: "Other Things are focusable",
                    help: "Hier steht hilfetext",
                },]
            },

        ]
    },
];

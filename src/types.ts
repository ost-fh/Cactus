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
    name: string;
    modes: mode[];
};

export type mode = {
    name: string;
    tests: test[];
};

export type test = {
    testerName: string;
    criteria: criteriumResult[]
};

// Test / Criteria Data

export type testData = {
    libraryId: string;
    libraryVersion: string;
    component: string;
    testMode: string;
    //criteriaGroup: criteriaGroup | undefined;
};

export type componentCriteria = {
    component: string;
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
    //testedBy: string
    //testedOn: Date
    testData: testData;
    criteria: criteriumResult[];
    // ...
};

export const criteriaCatalogue: componentCriteria[] = [
    {
        component: "Dialog",
        // TODO add alternative names field
        criteria: [
            {
                testMode: "Keyboard",
                instructions: "",
                videoLink: "link video",
                additionalHint: "",
                criteria: [
                    {
                        _id: "1",
                        text: "The focus (style) is visible",
                        help: "The focus is usually a ring around an interactive element, that shows what element is selected.",
                    },
                    {
                        _id: "2",
                        text: "Buttons are focusable",
                        help: "All interactive elements should be reachable only using the 'tab' key",
                    },
                    {
                        _id: "3",
                        text: "The focus is trapped inside the dialog",
                        help: "The focus should not leave the dialog. This means, all other interactive elements on the page are not reachable with the 'tab' key and are therefore outside of the taborder. ",
                    },
                    {
                        _id: "4",
                        text: "The dialog closes with the `esc` key",
                        help: "Upon pressing 'esc', the dialog should close. 'esc' is seen as the cancel option.",
                    },
                    {
                        _id: "5",
                        text: "The focus returns to the calling button after closing or canceling the dialog with `esc`",
                        help: "To help with seamless navigation, the focus should return to the element that opened a dialog.",
                    },
                ],
            },
            {
                testMode: "Screenreader",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [
                    {
                        _id: "11",
                        text: "The `[x]` close button has alt-text, that is read with the screenreader",
                        help: "If you select the close button with tab",
                    },
                    {
                        _id: "12",
                        text: "The content of the dialog is read upon opening",
                        help: "If a dialog opens, the text inside should automatically be read. A blind person otherwise can't know, that ther is a dialog open.",
                    },
                ],
            },
        ],
    },
    {
        component: "Accordion",
        criteria: [
            {
                testMode: "Screenreader",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [
                    {
                        _id: "21",
                        text: "Any hidden text is not read",
                        help: "Hier steht hilfetext",
                    },
                ],
            },
            {
                testMode: "Keyboard",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [
                    {
                        _id: "31",
                        text: "The header elements are focusable",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "32",
                        text: "The focus (style) is visible",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "33",
                        text: "The panel opens/closes with `space` or `enter` upon focus of a header element",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "34",
                        text: "Navigation between panel headers is possible with `tab`",
                        help: "Hier steht hilfetext",
                    },
                ],
            },
        ],
    },
    {
        component: "Tooltip",
        criteria: [
            {
                testMode: "Screenreader",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [
                    {
                        _id: "41",
                        text: "The tooltip is read upon focus of the element",
                        help: "Hier steht hilfetext",
                    },
                ],
            },
            {
                testMode: "Keyboard",
                instructions: "",
                videoLink: "",
                additionalHint: "",
                criteria: [
                    {
                        _id: "51",
                        text: "The element with the tooltip is focusable",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "52",
                        text: "The focus (style) is visible",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "53",
                        text: "The tooltip is shown upon focus",
                        help: "Hier steht hilfetext",
                    },
                    {
                        _id: "54",
                        text: "The tooltip closes with the `esc` key",
                        help: "Hier steht hilfetext",
                    },
                ],
            },
        ],
    },
];

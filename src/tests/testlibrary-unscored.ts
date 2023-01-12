export const testLibrary = {
  _id: {
    $oid: "63c03df729454e617af078af",
  },
  title: "unittesting",
  linkHome: "link",
  linkDocs: "link",
  currentVersion: "1",
  versions: [
    {
      version: "1",
      _id: {
        $oid: "63c03df729454e617af078b0",
      },
      components: [
        {
          name: "Accordion",
          alternativeComponentNames: "Disclosure",
          modes: [
            {
              name: "Keyboard",
              tests: [
                {
                  testedBy: "user1",
                  userBrowser: "Chrome 108",
                  userOs: "Windows 10",
                  criteria: [
                    {
                      criterium_id: "31",
                      text: "The header elements are focusable",
                      help: "Since the header/title elements are interactive and are used to open and close the accordion, they should be focusable. This means, by clicking the tab key repeatedly, you should reach the header element.",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e0429454e617af078c1",
                      },
                    },
                    {
                      criterium_id: "32",
                      text: "The focus (style) of the header elements is visible",
                      help: "If you reached the header element with tab, you should (easily) be able to recognize, what header element is currently focused.",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e0429454e617af078c2",
                      },
                    },
                    {
                      criterium_id: "33",
                      text: "The panel opens/closes with `space` or `enter` keys upon focus of a header element",
                      help: "To interact with the accordion, it should be possible to open and close it.",
                      choice: "no",
                      comment: "",
                      _id: {
                        $oid: "63c03e0429454e617af078c3",
                      },
                    },
                    {
                      criterium_id: "34",
                      text: "Navigation between panel headers is possible with `tab`",
                      help: "To open and close the different panels of the accordion, it is neccessary to be able to change between the different panels to open and close them",
                      choice: "not_decidable",
                      comment: "test",
                      _id: {
                        $oid: "63c03e0429454e617af078c4",
                      },
                    },
                  ],
                  _id: {
                    $oid: "63c03e0429454e617af078ca",
                  },
                  scorePerCriterium: [],
                },
                {
                  testedBy: "user1",
                  userBrowser: "Chrome 108",
                  userOs: "Windows 10",
                  criteria: [
                    {
                      criterium_id: "31",
                      text: "The header elements are focusable",
                      help: "Since the header/title elements are interactive and are used to open and close the accordion, they should be focusable. This means, by clicking the tab key repeatedly, you should reach the header element.",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e1229454e617af07907",
                      },
                    },
                    {
                      criterium_id: "32",
                      text: "The focus (style) of the header elements is visible",
                      help: "If you reached the header element with tab, you should (easily) be able to recognize, what header element is currently focused.",
                      choice: "no",
                      comment: "",
                      _id: {
                        $oid: "63c03e1229454e617af07908",
                      },
                    },
                    {
                      criterium_id: "33",
                      text: "The panel opens/closes with `space` or `enter` keys upon focus of a header element",
                      help: "To interact with the accordion, it should be possible to open and close it.",
                      choice: "no",
                      comment: "",
                      _id: {
                        $oid: "63c03e1229454e617af07909",
                      },
                    },
                    {
                      criterium_id: "34",
                      text: "Navigation between panel headers is possible with `tab`",
                      help: "To open and close the different panels of the accordion, it is neccessary to be able to change between the different panels to open and close them",
                      choice: "not_decidable",
                      comment: "test",
                      _id: {
                        $oid: "63c03e1229454e617af0790a",
                      },
                    },
                  ],
                  _id: {
                    $oid: "63c03e1229454e617af07915",
                  },
                  scorePerCriterium: [],
                },
              ],
              _id: {
                $oid: "63c03e0429454e617af078c8",
              },
              scoresPerCriterium: [],
            },
            {
              name: "Screenreader",
              tests: [
                {
                  testedBy: "user1",
                  userBrowser: "Chrome 108",
                  userOs: "Windows 10",
                  criteria: [
                    {
                      criterium_id: "21",
                      text: "Any hidden text is not read",
                      help: "Collapse one section of the accordion. Using the arrow keys, it should not be possible to read text that is not visible.",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e2029454e617af07970",
                      },
                    },
                    {
                      criterium_id: "22",
                      text: "The screenreader announces the current state of the accordion header element",
                      help: ".",
                      choice: "no",
                      comment: "",
                      _id: {
                        $oid: "63c03e2029454e617af07971",
                      },
                    },
                  ],
                  _id: {
                    $oid: "63c03e2029454e617af07982",
                  },
                  scorePerCriterium: [],
                },
                {
                  testedBy: "user1",
                  userBrowser: "Chrome 108",
                  userOs: "Windows 10",
                  criteria: [
                    {
                      criterium_id: "21",
                      text: "Any hidden text is not read",
                      help: "Collapse one section of the accordion. Using the arrow keys, it should not be possible to read text that is not visible.",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e3229454e617af079f3",
                      },
                    },
                    {
                      criterium_id: "22",
                      text: "The screenreader announces the current state of the accordion header element",
                      help: ".",
                      choice: "yes",
                      comment: "",
                      _id: {
                        $oid: "63c03e3229454e617af079f4",
                      },
                    },
                  ],
                  _id: {
                    $oid: "63c03e3229454e617af07a08",
                  },
                  scorePerCriterium: [],
                },
              ],
              _id: {
                $oid: "63c03e2029454e617af07980",
              },
              scoresPerCriterium: [],
            },
          ],
          _id: {
            $oid: "63c03e0429454e617af078c7",
          },
        },
      ],
    },
  ],
  createdAt: {
    $date: {
      $numberLong: "1673543159744",
    },
  },
  updatedAt: {
    $date: {
      $numberLong: "1673543218033",
    },
  },
  __v: 4,
};

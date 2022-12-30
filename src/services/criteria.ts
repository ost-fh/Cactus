import { componentCriteria, criterium } from "../types";

export const getAllCriteria = (): criterium[] => {
  const allCriteria = criteriaCatalogue.map((component) => {
    return component.criteria.map((group) => group.criteria);
  });
  return allCriteria.flat(2);
};

export const getCriterium = (id: string): criterium | undefined => {
  const allCriteria = getAllCriteria();
  return allCriteria.find((item) => item._id === id);
};

export const criteriaCatalogue: componentCriteria[] = [
  {
    component: "Dialog",
    alternativeComponentNames: "Modal, Promt",
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
            help: "The focus is usually a ring around an interactive element, that shows what element is selected. To test this, navigate to an interactive example of a dialog inside the documentation. It usually opens with a button of some sort. Click besides it and try to navigate to it with the 'tab' key. ",
          },
          {
            _id: "2",
            text: "Buttons are focusable",
            help: "All interactive elements should be reachable only using the 'tab' key. You can click buttons with 'enter' or sometimes with 'space'. If you could reach a button with tab, also inside the open dialog, this criteria is fulfilled.",
          },
          {
            _id: "3",
            text: "The focus is trapped inside the dialog",
            help: "The focus should not leave the dialog. This means, all other interactive elements on the page are not reachable with the 'tab' key and are therefore outside of the taborder. ",
          },
          {
            _id: "4",
            text: "The dialog closes with the `esc` key",
            help: "Have the dialog open. Upon pressing 'esc', the dialog should close. 'esc' is seen as the cancel option.",
          },
          {
            _id: "5",
            text: "The focus returns to the calling button after closing or canceling the dialog with `esc`",
            help: "To help with seamless navigation, the focus should return to the element that opened a dialog. So open the modal with a button or link that you selected with 'tab', then cancel or close the modal. the focus should return to the calling button.",
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
    alternativeComponentNames: "Disclosure",
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
    alternativeComponentNames: "Inline Dialog, Popover",
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

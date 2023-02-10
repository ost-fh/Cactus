import { componentCriteria, criterium } from "./types";

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
    description:
      "A dialog is a window overlaid over rest of the page. Users cannot interract with content outside of the dialog.",
    imageUrl: "/dialog.png",
    criteria: [
      {
        testMode: "Keyboard",
        criteria: [
          {
            _id: "1",
            text: "The focus (style) of interactive elements is visible",
            help: "The focus is usually a ring around an interactive element, that shows what element is selected. To test this, navigate to an interactive example of a dialog inside the documentation. It usually opens with a button of some sort. Click besides it and try to navigate to it with the 'tab' key. ",
          },
          {
            _id: "2",
            text: "Buttons are focusable",
            help: "All interactive elements should be reachable only using the 'tab' key. You can click buttons with 'enter' or sometimes with 'space'. If you could reach a button with tab, also inside the open dialog, this criteria is fulfilled.",
          },
          {
            _id: "3",
            text: "The focus does not leave the dialog",
            // "The focus is trapped inside the dialog",
            // "With the dialog open, elements outside of the dialog are not reachable"
            // "The focus does not leave the dialog"
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
        criteria: [
          {
            _id: "11",
            text: "The [x] button of the dialog is announced as the close button (or similar).",
            help: "If you select the close button with tab, the screenreader should read out to you, that this is a close button or similar. Not all modals have a close button. You might need to check different implementations",
          },
          {
            _id: "12",
            text: "The content of the dialog is read upon opening",
            help: "If a dialog opens, the text or at least the heading of the modal should automatically be read. A blind person otherwise can't know, that a dialog opened.",
          },
          {
            _id: "13",
            text: "It should not be possible to leave the modal using the arrow up and down keys",
            help: "The contents and non interactive elements of the dialog are read by navigating with the arrow up and down keys. To align with the keyboard accessibility, it should not be possible to accidently leave the modal using the the screenreader's reading function.",
          },
        ],
      },
    ],
  },
  {
    component: "Accordion",
    alternativeComponentNames: "Disclosure",
    description:
      "An accordion is a vertically stacked set of headings each with a collapsible panel",
    imageUrl: "/accordion.png",
    criteria: [
      {
        testMode: "Screenreader",
        criteria: [
          {
            _id: "21",
            text: "Any hidden text is not read",
            help: "Collapse one section of the accordion. Using the arrow keys, it should not be possible to read text that is not visible.",
          },
          {
            _id: "22",
            text: "The screenreader announces the current state of the accordion header element",
            help: ".",
          },
        ],
      },
      {
        testMode: "Keyboard",
        criteria: [
          {
            _id: "31",
            text: "The header elements are focusable",
            help: "Since the header/title elements are interactive and are used to open and close the accordion, they should be focusable. This means, by clicking the tab key repeatedly, you should reach the header element.",
          },
          {
            _id: "32",
            text: "The focus (style) of the header elements is visible",
            help: "If you reached the header element with tab, you should (easily) be able to recognize, what header element is currently focused.",
          },
          {
            _id: "33",
            text: "The panel opens/closes with `space` or `enter` keys upon focus of a header element",
            help: "To interact with the accordion, it should be possible to open and close it.",
          },
          {
            _id: "34",
            text: "Navigation between panel headers is possible with `tab`",
            help: "To open and close the different panels of the accordion, it is neccessary to be able to change between the different panels to open and close them",
          },
        ],
      },
    ],
  },
  {
    component: "Tooltip",
    alternativeComponentNames: "Inline Dialog, Popover",
    description:
      "A tooltip is a small popup element that shows additional information when hovering or focusing the tooltip triggering element.",
    imageUrl: "/tooltip.png",
    criteria: [
      {
        testMode: "Screenreader",
        criteria: [
          {
            _id: "41",
            text: "The tooltip is read upon focus of the element",
            help: "Once the element that tiggers the tooltip is focused, the content of the tooltip is read. the tooltip itself never recieves focus.",
          },
        ],
      },
      {
        testMode: "Keyboard",
        criteria: [
          {
            _id: "51",
            text: "The element with the tooltip is focusable",
            help: "To access the information in the tooltip, the tooltip must be focusable. By clicking the tab key repeatedly, you should reach the tooltip-triggering element.",
          },
          {
            _id: "52",
            text: "The focus (style) of the triggering element is visible",
            help: "If you reached the triggering element with tab, you should (easily) be able to tell that the element is currently focused.",
          },
          {
            _id: "53",
            text: "The tooltip is shown upon focus",
            help: "Once the element with the tooltip recieves focus with the tab key, the tooltip should be shown. This may happen with a small delay",
          },
          {
            _id: "54",
            text: "The tooltip closes with the `esc` key",
            help: "The tooltip should dissapear when pressing the escape key. It should also dissapear if the focus leaves the element, but that is not the focus here.",
          },
        ],
      },
    ],
  },
];
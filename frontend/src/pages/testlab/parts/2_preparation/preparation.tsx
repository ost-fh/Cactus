import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../shared/components/alert";
import Heading from "../../../../shared/components/heading";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import LabPathDisplay from "../../components/lab-path-display";
import { Library } from "../../../../shared/resources/types";
import "./preparation.scss";
import { TestDataContext } from "../../test-lab";
import { browserName, osName } from "react-device-detect";
import SelectScreenreader from "./parts/select-screenreader";
import ComponentLinkSection from "./parts/component-link-section";

type PreparationProps = {
  linkDocs: string;
  library: Library | undefined;
  changeLinkDocs: (linkDocs: string) => void;
  changeExists: (exists: boolean) => void;
  changeScreenreader: (screenreader: string) => void;
};

const Preparation = ({
  linkDocs,
  library,
  changeLinkDocs,
  changeExists,
  changeScreenreader,
}: PreparationProps) => {
  const navigate = useNavigate();
  const testData = useContext(TestDataContext);

  const screenreader = testData.testMode === "Screenreader";
  const [componentName, setComponentName] = useState<string>("");
  const [componentLinkDocs, setComponentLinkDocs] = useState<string>("");
  const [chosenScreenreader, setChosenScreenreader] = useState<string>();
  const [buttonState, setButtonState] = useState<"save" | "exclude">("save");

  // generate combined component display name
  useEffect(() => {
    if (testData.component) {
      setComponentName(
        `${testData.component}${
          testData.alternativeComponentNames &&
          testData.alternativeComponentNames.length > 0
            ? " or " + testData.alternativeComponentNames
            : ""
        }`
      );
    }
  }, [testData.alternativeComponentNames, testData.component]);

  useEffect(() => {
    setComponentLinkDocs(testData.componentLinkDocs);
  }, [testData.componentLinkDocs]);

  //display correct navigation button
  useEffect(() => {
    if (testData.componentExists) {
      setButtonState("save");
    } else {
      setButtonState("exclude");
    }
  }, [testData.componentExists]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (testData.componentExists) {
      console.log(
        `updating componentLinkDocs from ${testData.componentLinkDocs}  to ${componentLinkDocs}`
      );
      changeLinkDocs(componentLinkDocs);
    }
    if (screenreader && chosenScreenreader) {
      changeScreenreader(chosenScreenreader);
    }
    navigate("../test");
  };

  return (
    <form
      onSubmit={handleSubmit}
      id='testlab-preparation'
      className='lab-layout'
    >
      <LabPathDisplay currentPage='preparation' />
      <Heading visuallyHiddenPrefix='Step 2 of 4'>Test Preparation</Heading>
      <Alert
        type='help'
        message='Please follow the instructions to prepare for the test.'
      />
      {screenreader ? (
        <section>
          <h2>Step 1: Choose and set up a Screenreader</h2>
          <div className='layout-split'>
            <div className='subsection'>
              <p>To test with a screenreader, start up your screenreader.</p>
              <SelectScreenreader
                chosenScreenreader={chosenScreenreader}
                setChosenScreenreader={setChosenScreenreader}
              />
            </div>
            <Alert type='info'>
              <p>
                <strong>
                  Don't want to install a screenreader on your system?
                </strong>{" "}
                You can use the service{" "}
                <a
                  href='https://assistivlabs.com/'
                  target='_blank'
                  rel='noreferrer'
                >
                  AssistivLabs
                </a>{" "}
                (14 days free, sign-up required) to access a in-browser
                screenreader.
              </p>
              <p>
                <strong>No experience with a screenreader?</strong> To start
                off, we would recommend{" "}
                <a
                  href='https://www.nvaccess.org/'
                  target='_blank'
                  rel='noreferrer'
                >
                  <strong>NVDA</strong>
                </a>
                . If you never used NVDA before, there is a great{" "}
                <a
                  href='https://webaim.org/articles/nvda/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Tutorial on webaim.org
                </a>
                .
              </p>
            </Alert>
          </div>
        </section>
      ) : (
        <section>
          <h2>Step 1: Prepare your Browser</h2>
          <p>
            To test components with the keyboard, you might need to change
            settings to enable full keyboard navigation.
          </p>
          <Alert
            message={`You seem to be using ${browserName} on ${osName}.`}
          />
          <p>
            <strong>Safari</strong> does not enable keyboard navigation by
            default. Please go to Safari Preferences &gt; Advanced &gt;
            Accessibility &gt; Press "Tab to highlight each item on a webpage".
          </p>
          <p>
            <strong>Firefox on MacOS</strong> the Tab key will skip over plain
            links by default. Please open the System Preferences, navigate to
            Keyboard and to Shortcuts, check "all controls" or "keyboard
            navigation to move focus between controls", depending on the
            version. On MacOS Ventura, Press Ctrl + (Fn + ) F7.
          </p>
          <p>
            <strong>Other browsers</strong> should allow full keyboard
            navigation out of the box.
          </p>
        </section>
      )}

      <section>
        <h2>
          Step 2: Open the{" "}
          {testData.componentLinkDocs ? `${testData.component}` : "Library"}{" "}
          Documentation
        </h2>
        <div className='layout-split'>
          <div className='subsection'>
            <p>
              Place the documentation besides the testlab-window. (At least,
              that's what we recommend)
            </p>
            <a
              href={
                testData.componentLinkDocs
                  ? testData.componentLinkDocs
                  : linkDocs
              }
              className='button button-primary'
              target='_blank'
              rel='noreferrer'
            >
              Open Documentation in new Tab
            </a>
          </div>
          <img
            className='test-instruction-img'
            src='/instruction.png'
            alt='showing two windows besides each other'
          />
        </div>
      </section>
      {!testData.componentLinkDocs && (
        <section>
          <h2>Step 3: Navigate to the Component</h2>
          <p>
            Navigate to the documentation page of{" "}
            <strong>{componentName}</strong> (different libraries name the same
            component patterns in a different way).
          </p>
        </section>
      )}

      <ComponentLinkSection
        setComponentLinkDocs={setComponentLinkDocs}
        changeExists={changeExists}
        componentName={componentName}
        componentLinkDocs={componentLinkDocs}
        libraryTitle={library?.title}
      />

      <div className='control-group'>
        <h2 className='visually-hidden'>Navigation</h2>
        <button type='button' onClick={() => navigate("../specify")}>
          <BsChevronLeft /> Back
        </button>
        {buttonState === "save" && (
          <button type='submit' className='button-primary button-with-icon'>
            <BsChevronRight /> Save & Continue
          </button>
        )}
        {buttonState === "exclude" && (
          <button
            type='button'
            onClick={() => navigate("../exclude")}
            className='button-primary button-with-icon'
          >
            <BsChevronRight /> Exclude component
          </button>
        )}
      </div>
    </form>
  );
};

export default Preparation;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../shared/components/alert";
import Heading from "../../../../shared/components/heading";
import LinkButton from "../../../../shared/components/link-button";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import LabPathDisplay from "../../components/lab-path-display";
import { Library } from "../../../../shared/resources/types";
import "./preparation.scss";
import { TestDataContext } from "../../test-lab";
import { browserName, osName } from "react-device-detect";
import SelectScreenreader from "./select-screenreader";

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
  const [componentName, setComponentName] = useState<string>();
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
    if (
      componentLinkDocs !== "" &&
      testData.componentLinkDocs !== componentLinkDocs &&
      testData.componentExists
    ) {
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
      <section>
        {!testData.componentLinkDocs ? (
          <>
            <h2>Step 4: Add the Link pointing to the Documentation</h2>
            <p>
              <label htmlFor='linkDocs'>
                To make testing for other people easier, please copy the link to
                the component documentation and paste it here:
              </label>
            </p>
          </>
        ) : (
          <>
            <h3>Incorrect Link to Documentation?</h3>
            <p>
              <label htmlFor='linkDocs'>
                If the link to <strong>{`${componentName}`}</strong> is
                incorrect, please paste the correct link here:
              </label>
            </p>
          </>
        )}

        <input
          disabled={!testData.componentExists}
          id='linkDocs'
          placeholder='https://...'
          pattern='http(s)?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
          required
          onChange={(e) => {
            setComponentLinkDocs(e.target.value);
          }}
          value={componentLinkDocs}
          type='text'
        />
        <div>
          <p>Is the component not available? </p>
          <label>
            <input
              checked={!testData.componentExists}
              onChange={() => changeExists(!testData.componentExists)}
              type='checkbox'
            />
            Exclude the {testData.component} component from {library?.title}
          </label>
        </div>
      </section>

      <div className='control-group'>
        <h2 className='visually-hidden'>Navigation</h2>
        <LinkButton
          type='button'
          label='Back'
          to={"../specify"}
          icon={<BsChevronLeft />}
        />
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

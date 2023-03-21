import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../shared/components/alert";
import Heading from "../../../shared/components/heading";
import LinkButton from "../../../shared/components/link-button";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import LabPathDisplay from "../components/lab-path-display";
import { library, testData } from "../../../shared/resources/types";

type PreparationProps = {
  testData: testData;
  linkDocs: string;
  library: library | undefined;
  changeLinkDocs: (linkDocs: string) => void;
  changeExists: (exists: boolean) => void;
};

const Preparation = ({
  testData,
  linkDocs,
  library,
  changeLinkDocs,
  changeExists,
}: PreparationProps) => {
  const navigate = useNavigate();
  const screenreader = testData.testMode === "Screenreader";
  const [componentName, setComponentName] = useState<string>();
  const [componentLinkDocs, setComponentLinkDocs] = useState<string>("");
  const [buttonState, setButtonState] = useState<"save" | "next" | "exclude">(
    "next"
  );

  // generate combined component display name
  useEffect(() => {
    if (testData.component) {
      setComponentName(`${testData.component}
        ${
          testData.alternativeComponentNames !== "" &&
          testData.alternativeComponentNames !== undefined &&
          " or " + testData.alternativeComponentNames
        }`);
    }
  }, [testData.alternativeComponentNames, testData.component]);

  useEffect(() => {
    setComponentLinkDocs(testData.componentLinkDocs);
  }, [testData.componentLinkDocs]);

  //display correct button
  useEffect(() => {
    if (
      testData.componentLinkDocs === componentLinkDocs &&
      componentLinkDocs !== "" &&
      testData.componentExists
    ) {
      setButtonState("next");
    }
    if (
      testData.componentLinkDocs !== componentLinkDocs &&
      testData.componentExists
    ) {
      setButtonState("save");
    }
    if (componentLinkDocs === "") {
      setButtonState("save");
    }
    if (!testData.componentExists) {
      setButtonState("exclude");
    }
  }, [componentLinkDocs, testData.componentExists, testData.componentLinkDocs]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changeLinkDocs(componentLinkDocs);
    navigate("../test");
  };

  return (
    <form
      onSubmit={handleSubmit}
      id='testlab-preparation'
      className='lab-layout'
    >
      <LabPathDisplay currentPage='preparation' />
      <Heading>Test Preparation</Heading>
      <Alert
        type='help'
        message='Please follow the instructions to prepare for the test.'
      />
      {screenreader && (
        <section>
          <h3>Step 1: Set up Browser and Screenreader</h3>
          <p>
            To test with a screenreader, please have{" "}
            <a href='https://www.nvaccess.org/'>
              <strong>NVDA</strong>
            </a>{" "}
            ready and use <strong>Chrome</strong>. This way, we will have
            reproducible results. If you're on Mac, you can use{" "}
            <a href='https://assistivlabs.com/sign-up'>
              the service AssistivLabs
            </a>{" "}
            (14 days free, sign-up required) to access Chrome and NVDA.
          </p>
          <p>
            If you never used NVDA before, here is a great{" "}
            <a href='https://webaim.org/articles/nvda/'>
              Tutorial on webaim.org
            </a>
            .
          </p>
        </section>
      )}

      <section>
        <h3>Step {screenreader ? "2" : "1"}: Open the Documentation</h3>
        <div className='layout-split'>
          <div>
            <p>
              Open the documentation besides the testlab-window, as you can see
              on the image to the right. (At least, that's what we recommend)
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
              Open documentation in new tab
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
          <h3>Step {screenreader ? "3" : "2"}: Navigate to the Component</h3>
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
            <h3>
              Step {screenreader ? "4" : "3"}: Add link to the component
              documentation
            </h3>
            <p>
              <label htmlFor='linkDocs'>
                To make testing for other people easier, please copy the link to
                the component documentation and paste it here:
              </label>
            </p>
          </>
        ) : (
          <>
            <h4>Link to documentation incorrect?</h4>
            <p>
              <label htmlFor='linkDocs'>
                If the link is incorrect, please paste the correct link here:
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
          <p>Is the {testData.component} component not available? </p>
          <label>
            <input
              checked={!testData.componentExists}
              onChange={() => changeExists(!testData.componentExists)}
              type='checkbox'
            />
            Exclude the component {testData.component} from {library?.title}
          </label>
        </div>
      </section>

      <div className='control-group'>
        <LinkButton
          type='button'
          label='Back'
          to={"../specify"}
          icon={<BsChevronLeft />}
        />
        {buttonState === "next" && (
          <LinkButton
            label='Next'
            type='button'
            className='button-primary'
            icon={<BsChevronRight />}
            to='../test'
          ></LinkButton>
        )}
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

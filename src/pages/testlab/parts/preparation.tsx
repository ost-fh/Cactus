import React from "react";
import LinkButton from "../../../shared/components/link-button";
import { testData } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LabPathDisplay from "../components/lab-path-display";
import Heading from "../../../shared/components/heading";

type PreparationProps = {
  testData: testData;
  linkDocs: string;
};

const Preparation = ({ testData, linkDocs }: PreparationProps) => {
  const screenreader = testData.testMode === "Screenreader";

  return (
    <div className='lab-layout'>
      <LabPathDisplay currentPage='preparation' />
      <Heading>Test Preparation</Heading>
      <Alert
        type='help'
        message='Please follow the instructions to prepare for the test.'
      />
      {screenreader && (
        <div>
          <h3>Step 1: Set up Browser and Screenreader</h3>
          <p>
            To test with a screenreader, please have <strong>NVDA</strong> ready
            and use <strong>Chrome</strong>. This way, we will have reproducible
            results. If you're on Mac, you can use{" "}
            <a href='https://assistivlabs.com/sign-up'>AssistivLabs</a> (14 days
            free, sign-up required).
          </p>
        </div>
      )}
      <div>
        <h3>Step {screenreader ? "2" : "1"}: Open the Documentation</h3>
        <div className='layout-split'>
          <div>
            <p>
              Open the documentation besides the testlab-window, as you can see
              on the image to the right. (At least, that's what we recommend)
            </p>
            <a
              href={linkDocs}
              className='button button-primary'
              target='_blank'
              rel='noreferrer'
            >
              Open documentation
            </a>
          </div>
          <img src='/instr2.png' alt='showing two windows besides each other' />
        </div>
      </div>
      <div>
        <h3>Step {screenreader ? "3" : "2"}: Navigate to the Component</h3>
        <p>
          Navigate to the documentation page of{" "}
          <strong>
            {testData.component} or{" "}
            {testData.alternativeComponentNames !== "" &&
              testData.alternativeComponentNames !== undefined &&
              testData.alternativeComponentNames}
          </strong>{" "}
          (different libraries name the same component patterns in a different
          way).
        </p>
      </div>

      <div className='control-group'>
        <LinkButton
          type='button'
          label='Back'
          to={"../specify"}
          icon={<BsChevronLeft />}
        />
        <LinkButton
          label='Next'
          type='submit'
          className='button-primary'
          icon={<BsChevronRight />}
          to='../test'
        ></LinkButton>
      </div>
    </div>
  );
};

export default Preparation;

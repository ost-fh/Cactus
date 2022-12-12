import React from "react";
import Alert from "../components/Alert";
import LabPathDisplay from "../components/LabPathDisplay";
import LinkButton from "../components/LinkButton";
import { testData } from "../types";

type StartProps = {
  testData: testData;
};

const Start = ({ testData }: StartProps) => {
  return (
    <div>
      <LabPathDisplay currentPage='start' />
      <h2>Welcome to the test section. </h2>
      <Alert
        title='Attention: '
        type='help'
        message='If this is your first test, please read the information below'
      />
      <p>Here you can add tests to the chosen library.</p>
      <div className='lab-start-split'>
        <div>
          <h3>Step 1: Specify Test</h3>
          <p>
            In the next view, you will need to choose a component-type and a
            testmode.
          </p>
        </div>
        <div>
          <h3>Step 2: Test</h3>
          <p>
            There are several criteria that you will test and evaluate with the
            official documentation of the library.
          </p>
        </div>
        <div>
          <h3>Step 3: Confirmation</h3>
          <p>You will have done it!</p>
        </div>
      </div>
      <div className='control-group'>
        <LinkButton
          label={"Cancel and close Testlab"}
          to={"/libraries/" + testData.libraryId}
        />
        <LinkButton to='../specify' className='button-primary' label='Next' />
      </div>
    </div>
  );
};

export default Start;

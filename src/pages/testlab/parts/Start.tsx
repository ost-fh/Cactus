import React from "react";
import { BsChevronDoubleLeft, BsChevronRight } from "react-icons/bs";
import Alert from "../../../shared/components/alert";
import LinkButton from "../../../shared/components/link-button";
import { testData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/LabPathDisplay";

type StartProps = {
  testData: testData;
};

const Start = ({ testData }: StartProps) => {
  return (
    <div>
      <LabPathDisplay currentPage='start' />
      <h2>Welcome to the Testlab. </h2>
      <Alert
        title='Attention: '
        type='help'
        message='If this is your first test, please read the information below'
      />
      <p>
        Here in the <strong>Cactus Testlab</strong> you can add tests to the
        chosen library.
      </p>
      <p>In the top right, you can see the current test data.</p>
      <p>The next steps are:</p>
      <div className='lab-start-split'>
        <div>
          <h3>Step 2: Specify Test</h3>
          <p>
            In the next step, you will need to choose a component-type and a
            testmode.
          </p>
        </div>
        <div>
          <h3>Step 3: Test</h3>
          <p>
            There are several criteria that you will test and evaluate with the
            official documentation of the library.
          </p>
        </div>
        <div>
          <h3>Step 4: Confirmation</h3>
          <p>You are done!</p>
        </div>
      </div>
      <div className='control-group'>
        <LinkButton
          label={"Cancel and close Testlab"}
          to={`/libraries/${testData.libraryId}/${testData.libraryVersion}`}
          icon={<BsChevronDoubleLeft />}
        />
        <LinkButton
          to='../specify'
          className='button-primary'
          label='Next'
          icon={<BsChevronRight />}
        />
      </div>
    </div>
  );
};

export default Start;

import React from "react";
import Alert from "../components/Alert";
import LabPathDisplay from "../components/LabPathDisplay";
import LinkButton from "../components/LinkButton";

const Start = () => {
  return (
    <div>
      <LabPathDisplay currentPage='start' />
      {/* <h2>Start</h2> */}
      <Alert
        title='Attention: '
        type='help'
        message='If this is your first test, please read the information below'
      />
      <p>
        Welcome to the test section. Here you can add tests to the chosen
        library.
      </p>
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
      <LinkButton to='../specify' className='button' label='Next' />
    </div>
  );
};

export default Start;

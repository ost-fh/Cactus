import React, { useEffect, useState, useContext } from "react";
import Alert from "../../../shared/components/alert";
import {
  Component,
  ComponentCriteria,
  TestData,
} from "../../../shared/resources/types";
import SpecifyTestButton from "./specify-test-button";
import { UserContext } from "../../../App";

type SpecifyComponentFieldProps = {
  componentCriteria: ComponentCriteria;
  component: Component | undefined;
  testModes: string[];
  handleChange: Function;
  testData: TestData;
};

const checkForTestsFromUser = (
  userId: string | undefined,
  component: Component
) => {
  if (userId) {
    const result = component.modes.filter((mode) =>
      mode.tests.find((test) => test.testedBy === userId)
    );
    return result ? result.map((item) => item.name) : undefined;
  }
};

const SpecifyComponentField = ({
  componentCriteria,
  component,
  testModes,
  testData,
  handleChange,
}: SpecifyComponentFieldProps) => {
  const [exists, setExists] = useState(true);
  const userData = useContext(UserContext);
  const [alreadyTestedModes, setAlreadyTestedModes] = useState<string[]>();
  const [displayRedoTestMessage, setDisplayRedoTestMessage] = useState(false);

  useEffect(() => {
    const result = component;
    if (result?.exists === false) {
      setExists(false);
    } else {
      setExists(true);
    }
  }, [component]);

  // check if user already tested this component
  useEffect(() => {
    if (component) {
      const result = checkForTestsFromUser(userData?._id, component);
      setAlreadyTestedModes(result);
    }
  }, [component, userData?._id]);

  useEffect(() => {
    if (component && alreadyTestedModes) {
      if (
        testData.component === component.name &&
        alreadyTestedModes.find((item) => item === testData.testMode)
      ) {
        setDisplayRedoTestMessage(true);
      } else {
        setDisplayRedoTestMessage(false);
      }
    }
  }, [alreadyTestedModes, component, testData.component, testData.testMode]);

  return (
    <div className='specify-component'>
      <img
        src={componentCriteria.imageUrl}
        width={150}
        height={150}
        alt={componentCriteria.name}
      />
      <div className='specify-component-content'>
        <div className='specify-component-header'>
          <h3>{componentCriteria.name}</h3>
          <p>{componentCriteria.alternativeComponentNames}</p>
        </div>
        {exists ? (
          <div className='specify-component-options'>
            {testModes.map((testMode) => (
              <div key={`${componentCriteria.name}-${testMode}`}>
                <SpecifyTestButton
                  testData={testData}
                  testMode={testMode}
                  componentCriteria={componentCriteria}
                  handleChange={handleChange}
                  alreadyTested={
                    alreadyTestedModes?.find((item) => item === testMode)
                      ? true
                      : false
                  }
                  amountOfTests={
                    component?.modes.find((mode) => mode.name === testMode)
                      ?.testScores?.amountOfTests
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <Alert type='info' className='disabled-alert'>
            This component is marked as "not available" in this library. If you
            find this to be false, reenable the component please.
            <button onClick={() => setExists(true)}>Reenable Component</button>
          </Alert>
        )}
      </div>

      {displayRedoTestMessage && (
        <Alert
          className='redo'
          type='info'
          message={`You already tested the ${testData.component} with ${testData.testMode}. If you redo the test, your previous result will be replaced.`}
        />
      )}
    </div>
  );
};

export default SpecifyComponentField;

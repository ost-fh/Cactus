import React, { useEffect, useState, useContext } from "react";
import Alert from "../../../../../shared/components/alert";
import {
  Component,
  ComponentCriteria,
} from "../../../../../shared/resources/types";
import SpecifyTestButton from "./specify-test-button";
import { UserContext } from "../../../../../App";
import { TestDataContext } from "../../../test-lab";
import { getUserTestData } from "../../../../../shared/services/api";

type SpecifyComponentFieldProps = {
  componentCriteria: ComponentCriteria;
  component: Component | undefined;
  testModes: string[];
  handleChange: Function;
};

const checkForTestsFromUser = (
  userId: string | undefined,
  component: Component
) => {
  if (userId) {
    const tests = getUserTestData();
    return tests.then((data) => {
      const ids = data.map((item) => item.testMode);
      const result = component.modes.filter((mode) => {
        return ids.find((id) => id === mode._id);
      });
      return result ? result.map((item) => item.name) : [];
    });
  }
};

const SpecifyComponentField = ({
  componentCriteria,
  component,
  testModes,
  handleChange,
}: SpecifyComponentFieldProps) => {
  const [exists, setExists] = useState(true);
  const userData = useContext(UserContext);
  const testData = useContext(TestDataContext);
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

  // check if user already tested modes of this component
  useEffect(() => {
    if (component) {
      checkForTestsFromUser(userData?._id, component)?.then((result) =>
        setAlreadyTestedModes(result)
      );
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
    <div className='testlab-specify-component'>
      <img
        src={componentCriteria.imageUrl}
        width={150}
        height={150}
        alt={componentCriteria.name}
      />
      {/* <div className='specify-component-content'> */}
      <div className='header'>
        <h3>{componentCriteria.name}</h3>
        <p>{componentCriteria.alternativeComponentNames}</p>
      </div>
      {exists ? (
        <div className='options'>
          {testModes.map((testMode) => (
            <SpecifyTestButton
              key={`${componentCriteria.name}-${testMode}`}
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
          ))}
        </div>
      ) : (
        <Alert type='info' className='disabled-alert'>
          This component is marked as "not available" in this library. If you
          find this to be false, please reenable and test the component.
          <button onClick={() => setExists(true)}>Reenable Component</button>
        </Alert>
      )}
      {/* </div> */}

      <div aria-live='polite' className='redo'>
        {displayRedoTestMessage && (
          <Alert
            className='redo'
            type='info'
            message={`You already tested the ${testData.component} with ${testData.testMode}. If you redo the test, your previous result will be replaced.`}
          />
        )}
      </div>
    </div>
  );
};

export default SpecifyComponentField;

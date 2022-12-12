import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import LabPathDisplay from "../components/LabPathDisplay";
import LinkButton from "../components/LinkButton";
import SpecifyTestButton from "../components/SpecifyTestButton";
import { criteriaCatalogue, testData } from "../types";

type SpecifyTestProps = {
  testData: testData;
  setTestData: Function;
};

const SpecifyTest = ({ testData, setTestData }: SpecifyTestProps) => {
  const criteriaData = criteriaCatalogue;
  const components = criteriaData.map((item) => item.component);
  const testModes = ["Screenreader", "Keyboard"];

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (testData.component === "" || testData.testMode === "") {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [testData]);

  const handleChange = (component: string, testMode: string) => {
    setTestData({ ...testData, component: component, testMode: testMode });
  };

  return (
    <div className='lab-start'>
      <LabPathDisplay currentPage='specify' />

      <Alert type='help' message='Choose Component and Testmode to continue.' />

      <p>There are two testmodes for every component:</p>

      <p>
        Keyboard: this focuses on accessibility with keyboard use and screen,
        for example to use the 'enter'-key to click a button.
      </p>
      <p>
        Screenreader: this focuses on accessibility with a screenreader, for
        example to read an alt-text. Please use chrome and NVDA for this test.
      </p>
      <p>Choose one to continue.</p>

      {components.map((component) => (
        <div className='specify-component'>
          <p>{component}</p>
          <div className='specify-component-options'>
            {testModes.map((testMode) => (
              <SpecifyTestButton
                testData={testData}
                testMode={testMode}
                component={component}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      ))}

      <div className='control-group'>
        <LinkButton label={"Back"} to={"../start"} />
        <LinkButton
          disabled={!formValid}
          label='Next'
          className='button-primary'
          to='../test'
        ></LinkButton>
        {!formValid && <p className='text-red'>Please choose a test.</p>}
      </div>
    </div>
  );
};

export default SpecifyTest;

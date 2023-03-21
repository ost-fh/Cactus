import React, { useEffect, useState } from "react";
import { BsChevronDoubleLeft, BsChevronRight } from "react-icons/bs";
import Alert from "../../../shared/components/alert";
import LinkButton from "../../../shared/components/link-button";
import { getComponents } from "../../../shared/services/api";
import {
  componentCriteria,
  getVersion,
  library,
  testData,
  version,
} from "../../../shared/resources/types";
import LabPathDisplay from "../components/lab-path-display";
import SpecifyTestButton from "../components/specify-test-button";
import { useNavigate } from "react-router-dom";
import Heading from "../../../shared/components/heading";
import SpecifyComponentField from "../components/specify-component-field";

type SpecifyTestProps = {
  testData: testData;
  setTestData: Function;
  library: library | undefined;
};

const SpecifyTest = ({ testData, library, setTestData }: SpecifyTestProps) => {
  const navigate = useNavigate();

  const testModes = ["Keyboard", "Screenreader"];
  const [components, setComponents] = useState<componentCriteria[]>([]);
  const [version, setVersion] = useState<version>();

  useEffect(() => {
    if (library) setVersion(getVersion(library, testData.libraryVersion));
  }, [library, testData.libraryVersion]);

  useEffect(() => {
    getComponents().then((items) => setComponents(items));
  }, []);

  const handleChange = (
    component: string,
    alternativeComponentNames: string,
    testMode: string
  ) => {
    setTestData({
      ...testData,
      componentLinkDocs: "",
      component: component,
      alternativeComponentNames: alternativeComponentNames,
      testMode: testMode,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("../prepare");
  };

  if (!library) {
    return <>loading...</>;
  }

  return (
    <form onSubmit={handleSubmit} className='lab-layout'>
      <LabPathDisplay currentPage='specify' />
      <Heading>Welcome to the Testlab</Heading>
      <p>
        Here in the <strong>Cactus Testlab</strong> you can add tests to the
        chosen library.
      </p>
      <p>There are two testmodes for every component:</p>
      <p>
        <strong>Keyboard:</strong> this focuses on accessibility with keyboard
        use and screen, for example to use the 'enter'-key to click a button.
      </p>
      <p>
        <strong>Screenreader</strong>: this focuses on accessibility with a
        screenreader, for example to read an alt-text. Please use chrome and
        NVDA for this test.
      </p>
      <p>Each testmode displays the amount of tests that were already done.</p>
      <Alert type='help' message='Choose a testmode and continue.' />

      {components.map((component) => (
        <SpecifyComponentField
          key={component.name}
          componentCriteria={component}
          version={getVersion(library, testData.libraryVersion)}
        >
          {testModes.map((testMode) => (
            <div key={`${component}-${testMode}`}>
              <SpecifyTestButton
                testData={testData}
                testMode={testMode}
                component={component}
                handleChange={handleChange}
                amountOfTests={
                  version?.components
                    .find(
                      (foundComponent) => foundComponent.name === component.name
                    )
                    ?.modes.find((mode) => mode.name === testMode)?.testScores
                    ?.amountOfTests
                }
              />
            </div>
          ))}
        </SpecifyComponentField>
      ))}

      <div className='control-group'>
        <LinkButton
          type='button'
          label={"Cancel and close Testlab"}
          to={`/libraries/${testData.libraryId}/${testData.libraryVersion}`}
          icon={<BsChevronDoubleLeft />}
        />
        <button type='submit' className='button-primary button-with-icon'>
          <BsChevronRight /> Next
        </button>
      </div>
    </form>
  );
};

export default SpecifyTest;

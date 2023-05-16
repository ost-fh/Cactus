import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronDoubleLeft, BsChevronRight } from "react-icons/bs";
import Alert from "../../../shared/components/alert";
import LinkButton from "../../../shared/components/link-button";
import LabPathDisplay from "../components/lab-path-display";
import Heading from "../../../shared/components/heading";
import SpecifyComponentField from "../components/specify-component-field";
import { getComponentCriteria } from "../../../shared/services/api";
import {
  ComponentCriteria,
  getComponent,
  getVersion,
  Library,
  Version,
} from "../../../shared/resources/types";
import { TestDataContext } from "../test-lab";
import "./specify-test.scss";

type SpecifyTestProps = {
  setTestData: Function;
  library: Library | undefined;
};

const SpecifyTest = ({ library, setTestData }: SpecifyTestProps) => {
  const testData = useContext(TestDataContext);

  const navigate = useNavigate();

  const testModes = ["Keyboard", "Screenreader"];
  const [componentCriteria, setComponentCriteria] = useState<
    ComponentCriteria[]
  >([]);
  const [version, setVersion] = useState<Version>();

  useEffect(() => {
    if (library) setVersion(getVersion(library, testData.libraryVersion));
  }, [library, testData.libraryVersion]);

  useEffect(() => {
    getComponentCriteria().then((items) => setComponentCriteria(items));
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
      <h2 className='visually-hidden'>Introduction</h2>
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
      <p>
        You can always check the blue box on the top right to see what you chose
        to test.
      </p>
      {/* <p>Each testmode displays the amount of tests that were already done.</p> */}
      <Alert type='help' message='Choose a testmode and continue below.' />

      {componentCriteria.map((componentCriteria) => (
        <SpecifyComponentField
          key={componentCriteria.name}
          componentCriteria={componentCriteria}
          component={getComponent(componentCriteria.name, version)}
          testModes={testModes}
          handleChange={handleChange}
        />
      ))}
      <div className='control-group'>
        <h2 className='visually-hidden'>Navigation</h2>
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

import React from "react";
import {
  ComponentCriteria,
  TestData,
} from "../../../../../shared/resources/types";
import { BsCheckCircleFill } from "react-icons/bs";

type SpecifyTestButtonProps = {
  testData: TestData; // to check if active
  testMode: string;
  componentCriteria: ComponentCriteria;
  handleChange: Function;
  amountOfTests?: number;
  alreadyTested: boolean;
};

const SpecifyTestButton = ({
  testData,
  testMode,
  componentCriteria,
  handleChange,
  amountOfTests,
  alreadyTested,
}: SpecifyTestButtonProps) => {
  const active =
    testData.component === componentCriteria.name &&
    testData.testMode === testMode;

  return (
    <label
      className={`button button-with-icon ${active ? "button-selected" : ""}`}
    >
      <input
        type='radio'
        name={"testmode"}
        required
        onChange={() =>
          handleChange(
            componentCriteria.name,
            componentCriteria.alternativeComponentNames,
            testMode
          )
        }
        checked={active}
        id={`${testMode}-${componentCriteria.name}`}
      />
      <div>
        <strong>
          <span className='visually-hidden'>{componentCriteria.name} </span>
          {testMode}
        </strong>
        <br />
        {amountOfTests && amountOfTests >= 1 ? (
          <small>amount of tests: {amountOfTests} </small>
        ) : (
          <small>no tests</small>
        )}
        <br />
        {alreadyTested && (
          <small className='tested'>
            <BsCheckCircleFill size={"0.75rem"} /> Tested by you
          </small>
        )}
      </div>
    </label>
  );
};

export default SpecifyTestButton;

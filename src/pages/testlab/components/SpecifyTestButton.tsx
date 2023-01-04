import React from "react";
import { BsCheckSquare } from "react-icons/bs";
import { componentCriteria, testData } from "../../../shared/resources/types";

type SpecifyTestButtonProps = {
  testData: testData; // to check if active
  testMode: string;
  component: componentCriteria;
  handleChange: Function;
  amountOfTests?: number;
};

const SpecifyTestButton = ({
  testData,
  testMode,
  component,
  handleChange,
  amountOfTests,
}: SpecifyTestButtonProps) => {
  const active =
    testData.component === component.component &&
    testData.testMode === testMode;

  return (
    <button
      onClick={() =>
        handleChange(
          component.component,
          component.alternativeComponentNames,
          testMode
        )
      }
      className={`button-with-icon ${active && "button-selected"}`}
      aria-pressed={active}
    >
      {active && <BsCheckSquare />}
      <div>
        {testMode} <br />
        {amountOfTests && amountOfTests >= 1 ? (
          <small>amount of tests: {amountOfTests} </small>
        ) : (
          <small>no tests</small>
        )}
      </div>
    </button>
  );
};

export default SpecifyTestButton;

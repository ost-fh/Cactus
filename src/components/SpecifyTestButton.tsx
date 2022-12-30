import React from "react";
import { componentCriteria, testData } from "../types";

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
      className={active ? "button-selected" : ""}
      aria-pressed={active}
    >
      {testMode} <br></br>
      {amountOfTests && amountOfTests >= 1 ? (
        <small>amount of tests: {amountOfTests} </small>
      ) : (
        <small>no tests</small>
      )}
    </button>
  );
};

export default SpecifyTestButton;

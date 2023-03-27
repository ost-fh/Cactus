import React from "react";
import { ComponentCriteria, TestData } from "../../../shared/resources/types";

type SpecifyTestButtonProps = {
  testData: TestData; // to check if active
  testMode: string;
  component: ComponentCriteria;
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
    testData.component === component.name && testData.testMode === testMode;

  return (
    <label className={`button button-with-icon ${active && "button-selected"}`}>
      <input
        type='radio'
        name={"testmode"}
        required
        onChange={() =>
          handleChange(
            component.name,
            component.alternativeComponentNames,
            testMode
          )
        }
        checked={active}
        id={`${testMode}-${component.name}`}
      />
      <div>
        {testMode} <br />
        {amountOfTests && amountOfTests >= 1 ? (
          <small>amount of tests: {amountOfTests} </small>
        ) : (
          <small>no tests</small>
        )}
      </div>
    </label>
  );
};

export default SpecifyTestButton;

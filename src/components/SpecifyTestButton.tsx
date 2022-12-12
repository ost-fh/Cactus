import React from "react";
import { testData } from "../types";

type SpecifyTestButtonProps = {
  testData: testData;
  testMode: string;
  component: string;
  handleChange: Function;
};

const SpecifyTestButton = ({
  testData,
  testMode,
  component,
  handleChange,
}: SpecifyTestButtonProps) => {
  const active =
    testData.component === component && testData.testMode === testMode;

  return (
    <button
      onClick={() => handleChange(component, testMode)}
      className={active ? "button-selected" : ""}
      aria-pressed={active}
    >
      {testMode}
    </button>
  );
};

export default SpecifyTestButton;

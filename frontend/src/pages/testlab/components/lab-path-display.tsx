import React from "react";
import "./lab-path-display.css";
import LabPathDisplayField from "./lab-path-display-field";

type LabPathDisplayProps = {
  currentPage: "preparation" | "specify" | "test" | "confirm";
};

const LabPathDisplay = ({ currentPage }: LabPathDisplayProps) => {
  return (
    <div className='lab-path-display'>
      <LabPathDisplayField
        active={currentPage === "specify"}
        label='Testmode'
        step={1}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "preparation"}
        label='Preparation'
        step={2}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "test"}
        label='Test'
        step={3}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "confirm"}
        label='Confirmation'
        step={4}
      />
    </div>
  );
};

export default LabPathDisplay;

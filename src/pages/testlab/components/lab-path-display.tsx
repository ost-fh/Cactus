import React from "react";
import "./lab-path-display.css";
import LabPathDisplayField from "./lab-path-display-field";

type LabPathDisplayProps = {
  currentPage: string;
};

const LabPathDisplay = ({ currentPage }: LabPathDisplayProps) => {
  if (
    currentPage !== "start" &&
    currentPage !== "specify" &&
    currentPage !== "test" &&
    currentPage !== "confirm"
  )
    throw new Error();

  return (
    <div className='lab-path-display'>
      <LabPathDisplayField
        active={currentPage === "start"}
        label='Start'
        step={1}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "specify"}
        label='Specify Test'
        // label='Choose Mode'
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

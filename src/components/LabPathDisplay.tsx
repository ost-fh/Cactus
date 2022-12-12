import React from "react";
import "./labpathdisplay.css";
import LabPathDisplayField from "./LabPathDisplayField";

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
      <LabPathDisplayField active={currentPage === "start"} label='Start' />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "specify"}
        label='Specify Test'
      />
      <span className='path-connector'></span>
      <LabPathDisplayField active={currentPage === "test"} label='Test' />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "confirm"}
        label='Confirmation'
      />
    </div>
  );
};

export default LabPathDisplay;

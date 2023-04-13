import React from "react";
import "./lab-path-display.scss";
import LabPathDisplayField from "./lab-path-display-field";

type LabPathDisplayProps = {
  currentPage: "preparation" | "specify" | "test" | "confirm";
};

const LabPathDisplay = ({ currentPage }: LabPathDisplayProps) => {
  return (
    <div className='lab-path-display'>
      <LabPathDisplayField
        active={currentPage === "specify"}
        link={currentPage === "preparation" || currentPage === "test"}
        done={
          currentPage === "preparation" ||
          currentPage === "test" ||
          currentPage === "confirm"
        }
        linkString='specify'
        label='Testmode'
        step={1}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "preparation"}
        link={currentPage === "test"}
        done={currentPage === "test" || currentPage === "confirm"}
        linkString='prepare'
        label='Preparation'
        step={2}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "test"}
        linkString='test'
        done={currentPage === "confirm"}
        label='Test'
        step={3}
      />
      <span className='path-connector'></span>
      <LabPathDisplayField
        active={currentPage === "confirm"}
        linkString='confirm'
        label='Confirmation'
        step={4}
      />
    </div>
  );
};

export default LabPathDisplay;

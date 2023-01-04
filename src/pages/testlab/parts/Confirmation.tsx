import React from "react";
import LinkButton from "../../../shared/components/link-button";
import { testData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/LabPathDisplay";

type ConfirmationProps = {
  testData: testData;
};

const Confirmation = ({ testData }: ConfirmationProps) => {
  return (
    <div className='test-confirmation'>
      <LabPathDisplay currentPage={"confirm"} />
      <h2>Thank you very much!</h2>
      <p>Your evaluation was added to the library-results.</p>
      <LinkButton
        label={"Go to library overview"}
        className='button-primary'
        to={`/libraries/${testData.libraryId}/${testData.libraryVersion}`}
      />
    </div>
  );
};

export default Confirmation;

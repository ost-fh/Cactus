import React from "react";
import Heading from "../../../shared/components/heading";
import LinkButton from "../../../shared/components/link-button";
import { testData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/lab-path-display";

type ConfirmationProps = {
  testData: testData;
};

const Confirmation = ({ testData }: ConfirmationProps) => {
  return (
    <div className='test-confirmation'>
      <LabPathDisplay currentPage={"confirm"} />
      <Heading>Thank you very much!</Heading>
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

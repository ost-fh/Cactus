import React from "react";
import LabPathDisplay from "../components/LabPathDisplay";
import LinkButton from "../components/LinkButton";
import { testData } from "../types";

type ConfirmationProps = {
  testData: testData;
};

const Confirmation = ({ testData }: ConfirmationProps) => {
  return (
    <div className='test-confirmation'>
      <LabPathDisplay currentPage={"confirm"} />
      <h2>Thank you very much!</h2>
      <p>Your testresults were added to the library.</p>
      <LinkButton
        label={"Go to library overview"}
        className='button-primary'
        to={"/libraries/" + testData.libraryId}
      />
    </div>
  );
};

export default Confirmation;

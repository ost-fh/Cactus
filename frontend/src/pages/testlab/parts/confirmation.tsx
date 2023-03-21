import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Heading from "../../../shared/components/heading";
import LinkButton from "../../../shared/components/link-button";
import { testData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/lab-path-display";

type ConfirmationProps = {
  testData: testData;
  resetTestlab: () => void;
};

const Confirmation = ({ testData, resetTestlab }: ConfirmationProps) => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const startOver = () => {
    resetTestlab();
    navigate("../specify");
  };

  return (
    <div className='lab-layout'>
      <LabPathDisplay currentPage={"confirm"} />
      <Heading>Thank you very much!</Heading>

      <p>
        {searchParams.get("source") === "exclude"
          ? "The component was marked as not available."
          : "Your evaluation was added to the library results."}
      </p>
      <div className='control-group'>
        <button onClick={startOver}>Add another Test</button>
        <LinkButton
          label={"Go to library overview"}
          className='button-primary'
          to={`/libraries/${testData.libraryId}/${testData.libraryVersion}`}
        />
      </div>
    </div>
  );
};

export default Confirmation;

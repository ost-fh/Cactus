import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Heading from "../../../shared/components/heading";
import { TestData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/lab-path-display";
import { createTestFeedback } from "../../../shared/services/api";

type ConfirmationProps = {
  testData: TestData;
  resetTestlab: () => void;
};

const Confirmation = ({ testData, resetTestlab }: ConfirmationProps) => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [feedback, setFeedback] = useState("");

  const startOver = () => {
    sendFeedback();
    resetTestlab();
    navigate("../specify");
  };

  async function sendFeedback() {
    await createTestFeedback(testData, feedback);
  }

  function goToLibraryOverview() {
    sendFeedback();
    navigate(`/libraries/${testData.libraryId}/${testData.libraryVersion}`);
  }

  return (
    <div className='lab-layout'>
      <LabPathDisplay currentPage={"confirm"} />
      <Heading>Thank you very much!</Heading>

      <p>
        {searchParams.get("source") === "exclude"
          ? "The component was marked as not available."
          : "Your evaluation was added to the library results."}
      </p>
      <label htmlFor='feedbackField'>Please leave a feedback</label>
      <textarea
        id='feedbackField'
        name='feedbackField'
        rows={5}
        onChange={(e) => {
          setFeedback(e.target.value);
        }}
      ></textarea>
      <div className='control-group'>
        <button onClick={startOver}>Add another Test to this Library</button>
        <button onClick={goToLibraryOverview} className='button-primary'>
          Go to Library Overview
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

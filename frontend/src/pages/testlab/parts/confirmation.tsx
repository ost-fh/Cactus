import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Heading from "../../../shared/components/heading";
import { TestData } from "../../../shared/resources/types";
import LabPathDisplay from "../components/lab-path-display";
import { createTestFeedback } from "../../../shared/services/api";
import Alert from "../../../shared/components/alert";
import "./confirmation.scss";
import LinkButton from "../../../shared/components/link-button";

type ConfirmationProps = {
  testData: TestData;
  resetTestlab: () => void;
};

const Confirmation = ({ testData, resetTestlab }: ConfirmationProps) => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const startOver = () => {
    resetTestlab();
    navigate("../specify");
  };

  const sendFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createTestFeedback(testData, feedback);
    setFeedbackSent(true);
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
      <Alert type='help' className='feedback-form'>
        <h3>Your Feedback matters!</h3>
        <form onSubmit={sendFeedback}>
          <label htmlFor='feedbackField'>
            We value your feedback and would appreciate if you could take a few
            minutes to share your thoughts with us. Your feedback will help us
            improve our testlab and provide a better experience for all users.
            <ul>
              <li>How was the overall process?</li>
              <li>
                Were there any questions that were confusing or unclear? If so,
                which ones?
              </li>
              <li>Is there anything else you would like to share with us?</li>
            </ul>
          </label>
          <textarea
            id='feedbackField'
            name='feedbackField'
            rows={5}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
            required
            disabled={feedbackSent}
          ></textarea>
          {feedbackSent ? (
            <Alert type='success' message='Thanks for your feedback'></Alert>
          ) : (
            <button
              type='submit'
              className={feedback !== "" ? "button-primary" : ""}
            >
              Send Feedback
            </button>
          )}
        </form>
      </Alert>
      <div className='control-group'>
        <button onClick={startOver}>Add another Test to this Library</button>
        <LinkButton
          label={"Go to Library Overview"}
          className='button-primary'
          to={`/libraries/${testData.libraryId}/${testData.libraryVersion}`}
        />
      </div>
    </div>
  );
};

export default Confirmation;

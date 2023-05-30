import React from "react";
import Alert from "./alert";

const FeedbackForm = () => {
  const sendFeedback = () => {};
  return (
    <Alert type='help' className='feedback-form'>
      <h2>Your Feedback matters!</h2>
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
        {/* <textarea
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
        )} */}
      </form>
    </Alert>
  );
};

export default FeedbackForm;

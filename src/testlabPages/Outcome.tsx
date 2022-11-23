import React from "react";
import LinkButton from "../components/LinkButton";
import { testData } from "../types";

type OutcomeProps = {
  testData: testData;
};

const Outcome = ({ testData }: OutcomeProps) => {
  console.log(testData);

  return (
    <div className='test-outcome'>
      <h2>Thank you very much!</h2>
      <p>Your testresults were added to the library.</p>
      <LinkButton
        label={"Go to library overview"}
        classname='button-primary'
        path={"/libraries/" + testData.libraryId}
      />
    </div>
  );
};

export default Outcome;

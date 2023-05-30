import React from "react";
import Alert from "../../../shared/components/alert";
import ScoreBubble from "../../../shared/components/score-bubble";
import ResultBubble from "../../../shared/components/result-bubble";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";
import CountBubble from "../../../shared/components/count-bubble";

const ScoringSystemLibraryDetail = () => {
  return (
    <Alert type='help'>
      <h2>Scoring System</h2>
      <div className='lib-detail-help'>
        <ScoreBubble label='Cactus Score (example)' score={100} />
        <p>
          This is an average score over all the tests that were made for a
          component, testmode or library. It gives an idea about how good a
          library performs in terms of accessibility.
        </p>

        <ResultBubble
          label='criterion results demo'
          positive={4}
          negative={0}
          not_decided={0}
        />
        <p>
          This shows how many testers voted if a criterium was fullfilled, not
          fulfilled or not decidable. (exemplary numbers used)
        </p>
        {SHOW_AGREEMENT_SCORE && (
          <>
            <CountBubble label='Agreement Score (example)' count={1} />
            <p>
              This number between 0 and 1 shows how much different testers agree
              with each other. A number closer to 1 is better.
            </p>
          </>
        )}
      </div>
    </Alert>
  );
};

export default ScoringSystemLibraryDetail;

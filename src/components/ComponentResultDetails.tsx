import React from "react";
import { mode } from "../types";
import Alert from "./Alert";
import CountBubble from "./CountBubble";
import CriteriumResult from "./CriteriumResult";
import ScoreBubble from "./ScoreBubble";

type ComponentResultDetailsProps = {
  screenReaderScores: mode | undefined;
  keyboardScores: mode | undefined;
};

/** This Component is to be used with ComponentResult */
const ComponentResultDetails = ({
  screenReaderScores,
  keyboardScores,
}: ComponentResultDetailsProps) => {
  return (
    <>
      <div className='count-list'>
        <h4>Keyboard Scores:</h4>
        {keyboardScores ? (
          <>
            <ScoreBubble score={keyboardScores.accessibilityScore} />
            <CountBubble
              label='Tests'
              count={keyboardScores.testScores?.amountOfTests}
            />
            <CountBubble
              label='Agreement Score'
              count={keyboardScores.agreementScore}
            />
            <h4 className='count-list-br'>Keyboard Criteria Evaluation:</h4>
            {keyboardScores.scoresPerCriterium.map((item) => {
              return (
                <CriteriumResult
                  key={item.criterium_id + keyboardScores.name}
                  item={item}
                />
              );
            })}
          </>
        ) : (
          <Alert message='There were no keyboard accessibility tests done yet' />
        )}
      </div>
      <div className='count-list'>
        <h4>Screenreader Scores:</h4>
        {screenReaderScores ? (
          <>
            <ScoreBubble score={screenReaderScores.accessibilityScore} />
            <CountBubble
              label='Tests'
              count={screenReaderScores.testScores.amountOfTests}
            />
            <CountBubble
              label='Agreement Score'
              count={screenReaderScores.agreementScore}
            />
            <h4 className='count-list-br'>Screenreader Criteria Evaluation:</h4>

            {screenReaderScores.scoresPerCriterium.map((item) => {
              return (
                <CriteriumResult
                  key={item.criterium_id + screenReaderScores.name}
                  item={item}
                />
              );
            })}
          </>
        ) : (
          <Alert message='There were no screenreader accessibility tests done yet' />
        )}
      </div>
    </>
  );
};

export default ComponentResultDetails;

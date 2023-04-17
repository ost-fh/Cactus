import React, { useContext } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { UserContext } from "../../../App";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";
import { mode } from "../../../shared/resources/types";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";

import CriteriumResult from "./criterium-result";

type ComponentResultDetailsProps = {
  screenReaderScores: mode | undefined;
  keyboardScores: mode | undefined;
  testlabComponentURL: string;
};

/** This Component is used with ComponentResult */
const ComponentResultDetails = ({
  screenReaderScores,
  keyboardScores,
  testlabComponentURL,
}: ComponentResultDetailsProps) => {
  const userData = useContext(UserContext);

  return (
    <>
      <div className='scores'>
        <h4>Keyboard Scores:</h4>
        {keyboardScores ? (
          <>
            <ScoreBubble
              color='green-light'
              score={keyboardScores.accessibilityScore}
            />
            <CountBubble
              label='Tests'
              count={keyboardScores.testScores?.amountOfTests}
            />
            {SHOW_AGREEMENT_SCORE && (
              <CountBubble
                label='Agreement Score'
                count={keyboardScores.agreementScore}
              />
            )}
            <h4 className='scores-break'>Keyboard Criteria Evaluation:</h4>
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
          <Alert className='alert-with-icon'>
            {/* <Alert message='There were no keyboard accessibility tests done yet' /> */}
            <p>There were no keyboard accessibility tests done yet.</p>
            {userData && (
              <LinkButton
                to={`${testlabComponentURL}&mode=Keyboard`}
                label={"Add tests"}
              />
            )}
          </Alert>
        )}
      </div>
      <div className='scores'>
        <h4>Screenreader Scores:</h4>
        {screenReaderScores ? (
          <>
            <ScoreBubble
              color='green-light'
              score={screenReaderScores.accessibilityScore}
            />
            <CountBubble
              label='Tests'
              count={screenReaderScores.testScores.amountOfTests}
            />
            {SHOW_AGREEMENT_SCORE && (
              <CountBubble
                label='Agreement Score'
                count={screenReaderScores.agreementScore}
              />
            )}
            <h4 className='scores-break'>Screenreader Criteria Evaluation:</h4>

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
          <Alert className='alert-with-icon'>
            <BsInfoCircleFill />
            <p>There were no screenreader accessibility tests done yet.</p>
            {userData && (
              <LinkButton
                to={`${testlabComponentURL}&mode=Screenreader`}
                label={"Add tests"}
              />
            )}
          </Alert>
          // <Alert message='There were no screenreader accessibility tests done yet' />
        )}
      </div>
    </>
  );
};

export default ComponentResultDetails;

import React from "react";
import { component } from "../types";
import Alert from "./Alert";
import CountBubble from "./CountBubble";
import ScoreBubble from "./ScoreBubble";

type ComponentResultProps = {
  component: component;
};

const ComponentResult = ({ component }: ComponentResultProps) => {
  const screenReaderScores = component.modes.find(
    (mode) => mode.name === "Screenreader"
  );
  const keyboardScores = component.modes.find(
    (mode) => mode.name === "Keyboard"
  );
  return (
    <article className='lib-testresult'>
      <header>
        <h3>{component.name}</h3>
        <p>{component.alternativeComponentNames}</p>
        {/* {(!screenReaderScores ||
          screenReaderScores.testScores.amountOfTests < 3 ||
          !keyboardScores ||
          keyboardScores.testScores.amountOfTests < 3) && (
          <Alert type='error' message='This component needs more testing' />
        )} */}
      </header>
      <div className='count-list'>
        <p>
          <strong>Overall Scores:</strong>
        </p>
        <ScoreBubble score={component.accessibilityScore} />
        <CountBubble label='tests were done' count={component.amountOfTests} />
        <CountBubble label='Agreement Score' count={component.agreementScore} />

        {/* testmodes */}
      </div>

      <div className='count-list'>
        <p>Screenreader Scores:</p>
        {screenReaderScores ? (
          <>
            <ScoreBubble score={screenReaderScores.accessibilityScore} />
            <CountBubble
              label='tests were done'
              count={screenReaderScores.testScores.amountOfTests}
            />
            <CountBubble
              label='Agreement Score'
              count={screenReaderScores.agreementScore}
            />
          </>
        ) : (
          <Alert message='There were no screenreader accessibility tests done yet' />
        )}
      </div>
      <div className='count-list'>
        <p>Keyboard Scores:</p>
        {keyboardScores ? (
          <>
            <ScoreBubble score={keyboardScores.accessibilityScore} />
            <CountBubble
              label='tests were done'
              count={keyboardScores.testScores.amountOfTests}
            />
            <CountBubble
              label='Agreement Score'
              count={keyboardScores.agreementScore}
            />
          </>
        ) : (
          <Alert message='There were no keyboard accessibility tests done yet' />
        )}
      </div>
    </article>
  );
};

export default ComponentResult;

import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { component } from "../types";
import Alert from "./Alert";
import ComponentResultDetails from "./ComponentResultDetails";
import CountBubble from "./CountBubble";
import ScoreBubble from "./ScoreBubble";

type ComponentResultProps = {
  component: component;
};

/** This Component is to be used with LibraryDetail */
const ComponentResult = ({ component }: ComponentResultProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const screenReaderScores = component.modes.find(
    (mode) => mode.name === "Screenreader"
  );
  const keyboardScores = component.modes.find(
    (mode) => mode.name === "Keyboard"
  );

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  return (
    <article className='lib-testresult'>
      <header>
        <h3>{component.name}</h3>
        <p>{component.alternativeComponentNames}</p>
        {!component.componentTested && (
          <Alert type='info' message='This component needs more testing' />
        )}
        {/* {(!screenReaderScores ||
          screenReaderScores.testScores.amountOfTests < 3 ||
          !keyboardScores ||
          keyboardScores.testScores.amountOfTests < 3) && (
          <Alert type='info' message='This component needs more testing' />
        )} */}
      </header>
      <div className='count-list'>
        <p>
          <strong>Overall Scores:</strong>
        </p>
        <ScoreBubble score={component.accessibilityScore} />
        <CountBubble label='Tests total' count={component.amountOfTests} />
        <CountBubble label='Agreement Score' count={component.agreementScore} />
      </div>
      <div>
        <button className='button-with-icon' onClick={toggleDetails}>
          {detailsOpen ? (
            <>
              <BsChevronUp /> Hide
            </>
          ) : (
            <>
              <BsChevronDown /> Show
            </>
          )}{" "}
          detailed evaluation
        </button>
      </div>
      {detailsOpen && (
        <ComponentResultDetails
          screenReaderScores={screenReaderScores}
          keyboardScores={keyboardScores}
        />
      )}
    </article>
  );
};

export default ComponentResult;

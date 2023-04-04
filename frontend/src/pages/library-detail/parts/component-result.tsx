import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Component, ComponentCriteria } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import ScoreBubble from "../../../shared/components/score-bubble";
import ComponentResultDetails from "./component-result-details";
import "./component-result.scss";
import { getComponentCriteria } from "../../../shared/services/api";
import { SHOW_AGREEMENT_SCORE } from "../library-detail";
import Bubble from "../../../shared/components/bubble";

type ComponentResultProps = {
  component: Component;
};

/** This component is used by LibraryDetail */
const ComponentResult = ({ component }: ComponentResultProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [componentData, setComponentData] = useState<ComponentCriteria>();

  useEffect(() => {
    getComponentCriteria().then((items) => {
      const result = items.find((item) => item.name === component.name);
      setComponentData(result);
    });
  }, [component.name]);

  const screenReaderScores = component.modes.find(
    (mode) => mode.name === "Screenreader"
  );
  const keyboardScores = component.modes.find(
    (mode) => mode.name === "Keyboard"
  );

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  if (component.exists === false) {
    return (
      <article className='lib-testresult-disabled lib-testresult'>
        <header>
          <img
            src={componentData?.imageUrl}
            alt={`schematic of ${component.name}`}
            width={150}
            height={150}
          />
          <div>
            <h3>
              {component.name}{" "}
              <small>(or {component.alternativeComponentNames})</small>
            </h3>

            <p>{componentData?.description}</p>
          </div>
          <Alert
            type='error'
            message='This component is not available in this library.'
          />
        </header>
      </article>
    );
  }

  return (
    <article className='lib-testresult'>
      <header>
        <img
          src={componentData?.imageUrl}
          width={150}
          height={150}
          alt={`schematic of ${component.name}`}
        />
        <div>
          <h3>
            {component.name}{" "}
            <small>(or {component.alternativeComponentNames})</small>
          </h3>

          <p>{componentData?.description}</p>
        </div>
        {!component.componentTested && (
          <Alert type='info' message='This component needs more testing' />
        )}
      </header>
      <div className='count-list'>
        <p>
          <strong>Overall Scores:</strong>
        </p>
        {component.componentTested ? (
          <ScoreBubble score={component.accessibilityScore} />
        ) : (
          <Bubble
            value={`${component.accessibilityScore}%`}
            label='Cactus Score (incomplete)'
            color='yellow'
          />
        )}
        <CountBubble label='Tests total' count={component.amountOfTests} />
        {SHOW_AGREEMENT_SCORE && (
          <CountBubble
            label='Agreement Score'
            count={component.agreementScore}
          />
        )}
      </div>
      <div>
        <button
          className='button-with-icon'
          aria-label={`${
            detailsOpen ? "Hide" : "Show"
          } detailed evaluation of ${component.name}`}
          onClick={toggleDetails}
        >
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

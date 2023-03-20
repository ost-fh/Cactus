import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { component, componentCriteria } from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import CountBubble from "../../../shared/components/count-bubble";
import ScoreBubble from "../../../shared/components/score-bubble";
import ComponentResultDetails from "./component-result-details";
import "./component-result.css";
import { getComponents } from "../../../shared/services/api";

type ComponentResultProps = {
  component: component;
};

/** This Component is to be used with LibraryDetail */
const ComponentResult = ({ component }: ComponentResultProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [componentData, setComponentData] = useState<componentCriteria>();

  useEffect(() => {
    getComponents().then((items) => {
      const res = items.find(
        (item: componentCriteria) => item.name === component.name
      );

      setComponentData(res);
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
        <ScoreBubble score={component.accessibilityScore} />
        <CountBubble label='Tests total' count={component.amountOfTests} />
        <CountBubble label='Agreement Score' count={component.agreementScore} />
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

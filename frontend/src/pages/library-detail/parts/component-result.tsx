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
  testlabComponentURL: string;
};

/** This component is used by LibraryDetail */
const ComponentResult = ({
  component,
  testlabComponentURL,
}: ComponentResultProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [componentData, setComponentData] = useState<ComponentCriteria>();

  useEffect(() => {
    getComponentCriteria().then((items) => {
      const result = items.find((item) => item.name === component.name);
      setComponentData(result);
    });
  }, [component.name]);

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  if (component.exists === false) {
    return (
      <section className='lib-testresult-disabled lib-testresult'>
        <img
          src={componentData?.imageUrl}
          alt={`schematic of ${component.name}`}
          width={150}
          height={150}
        />

        <h2 className='title'>
          {component.name}{" "}
          {component.alternativeComponentNames &&
            component.alternativeComponentNames.length > 0 && (
              <small>(or {component.alternativeComponentNames})</small>
            )}
        </h2>

        <p className='description'>{componentData?.description}</p>

        <Alert
          className='more-testing-alert'
          type='error'
          message='This component is not available in this library.'
        />
      </section>
    );
  }

  return (
    <section className='lib-testresult'>
      <img
        src={componentData?.imageUrl}
        width={150}
        height={150}
        alt={`schematic of ${component.name}`}
      />

      <h2 className='title'>
        {component.name}{" "}
        {component.alternativeComponentNames &&
          component.alternativeComponentNames.length > 0 && (
            <small>(or {component.alternativeComponentNames})</small>
          )}
      </h2>

      <p className='description'>{componentData?.description}</p>

      <div className='main-scores scores'>
        {component.componentTested ? (
          <ScoreBubble
            color='green-light'
            score={component.accessibilityScore}
          />
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
      <div className='expand-scores'>
        <button
          className='button-with-icon'
          aria-label={`${
            detailsOpen ? "Hide" : "Show"
          } detailed evaluation of ${component.name}`}
          aria-expanded={detailsOpen}
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
        {!component.componentTested && (
          <Alert
            className='more-testing-alert'
            type='info'
            message='This component needs more testing'
          />
        )}
      </div>
      {detailsOpen && (
        <ComponentResultDetails
          componentName={component.name}
          testModes={component.modes}
          testlabComponentURL={`${testlabComponentURL}?component=${component.name}`}
        />
      )}
    </section>
  );
};

export default ComponentResult;

import React, { useEffect, useState } from "react";
import { component } from "../types";
import CountBubble from "./CountBubble";
import ScoreBubble from "./ScoreBubble";

type ComponentResultProps = {
  component: component;
};

const ComponentResult = ({ component }: ComponentResultProps) => {
  return (
    <article className='lib-testresult'>
      <header>
        <h3>{component.name}</h3>
      </header>
      <div className='count-list'>
        <ScoreBubble score={component.accessibilityScore} />
        <CountBubble label='tests were done' count={component.amountOfTests} />
        <CountBubble label='Agreement Score' count={component.agreementScore} />
      </div>
    </article>
  );
};

export default ComponentResult;

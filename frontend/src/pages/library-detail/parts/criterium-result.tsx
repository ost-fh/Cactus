import React from "react";
import { getCriterium } from "../../../shared/resources/criteria";
import { criteriumScore } from "../../../shared/resources/types";
import CountBubble from "../../../shared/components/count-bubble";
import ResultBubble from "../../../shared/components/result-bubble";
import "./criterium-result.css";

type CriteriumResultProps = {
  item: criteriumScore;
};

/** This Component is to be used with ComponentResultDetails */
const CriteriumResult = ({ item }: CriteriumResultProps) => {
  const criterium = getCriterium(item.criterium_id);

  return (
    <div className='criterium-detail'>
      <div className='criterium-text'>{criterium?.text}</div>
      <ResultBubble
        positive={item.positive}
        negative={item.negative}
        not_decided={item.notDecided}
      />
      <CountBubble label='Agreement Score' count={item.agreementScore} />
    </div>
  );
};

export default CriteriumResult;

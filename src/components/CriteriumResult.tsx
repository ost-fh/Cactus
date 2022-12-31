import React from "react";
import { getCriterium } from "../services/criteria";
import { criteriumScore } from "../types";
import CountBubble from "./CountBubble";
import "./criteriumresult.css";

type CriteriumResultProps = {
  item: criteriumScore;
};

/** This Component is to be used with ComponentResultDetails */
const CriteriumResult = ({ item }: CriteriumResultProps) => {
  const criterium = getCriterium(item.criterium_id);

  return (
    <div className='criterium-detail'>
      <div className='criterium-text'>{criterium?.text}</div>
      <div className='criterium-result'>
        {item.positive} + | {item.negative} - | {item.notDecided} ?
      </div>
      <CountBubble label='Agreement' count={item.agreementScore} />
    </div>
  );
};

export default CriteriumResult;

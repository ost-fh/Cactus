import React from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsPatchQuestion,
} from "react-icons/bs";
import { getCriterium } from "../../../shared/resources/criteria";
import { criteriumScore } from "../../../shared/resources/types";
import CountBubble from "../../../shared/components/count-bubble";
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
      <div className='criterium-result'>
        {item.positive} <BsHandThumbsUp title='Positive' /> | {item.negative}{" "}
        <BsHandThumbsDown title='negative' /> | {item.notDecided}{" "}
        <BsPatchQuestion title='not decided' />
      </div>
      <CountBubble label='Agreement Score' count={item.agreementScore} />
    </div>
  );
};

export default CriteriumResult;

import React from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsPatchQuestion,
} from "react-icons/bs";

type ResultBubbleProps = {
  positive: number;
  negative: number;
  not_decided: number;
};

const ResultBubble = (props: ResultBubbleProps) => {
  return (
    <div className='criterium-result'>
      <span>
        {props.positive} <BsHandThumbsUp title='Positive' /> | {props.negative}{" "}
        <BsHandThumbsDown title='negative' /> | {props.not_decided}{" "}
        <BsPatchQuestion title='not decided' />
      </span>
    </div>
  );
};

export default ResultBubble;

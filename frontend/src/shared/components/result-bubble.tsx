import React from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsPatchQuestion,
} from "react-icons/bs";
import "./result-bubble.scss";

type ResultBubbleProps = {
  positive: number;
  negative: number;
  not_decided: number;
};

const ResultBubble = (props: ResultBubbleProps) => {
  return (
    <div>
      <div className='criterium-result-bubble'>
        <span>
          {props.positive} <BsHandThumbsUp title='Positive' />{" "}
        </span>
        <span>
          {props.negative} <BsHandThumbsDown title='negative' />{" "}
        </span>
        <span>
          {props.not_decided} <BsPatchQuestion title='not decided' />
        </span>
      </div>
    </div>
  );
};

export default ResultBubble;

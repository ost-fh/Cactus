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
  label: string;
};

const ResultBubble = (props: ResultBubbleProps) => {
  return (
    <div>
      <ul className='criterium-result-bubble'>
        <li className='visually-hidden'>{props.label}</li>
        <li>
          {props.positive} <span className='visually-hidden'> Positive</span>
          <BsHandThumbsUp title='' />
        </li>
        <li>
          {props.negative} <span className='visually-hidden'> Negative</span>
          <BsHandThumbsDown title='' />
        </li>
        <li>
          {props.not_decided}{" "}
          <span className='visually-hidden'> Not decided</span>
          <BsPatchQuestion title='' />
        </li>
      </ul>
    </div>
  );
};

export default ResultBubble;

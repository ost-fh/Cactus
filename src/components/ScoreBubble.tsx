import React from "react";

type ScoreBubbleProps = {
  /**
   * without percent-sign
   */
  score: number;
  label?: string;
};

const ScoreBubble = ({ score, label = "accessible" }: ScoreBubbleProps) => {
  return (
    <div className='score-bubble'>
      <span className='score-score'>{score}%</span> {label}
    </div>
  );
};

export default ScoreBubble;

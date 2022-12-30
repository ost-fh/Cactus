import React from "react";
import "./bubble.css";

type ScoreBubbleProps = {
  /**
   * without percent-sign
   */
  score: number;
  label?: string;
};

const ScoreBubble = ({
  score,
  label = "Accessibility Score",
}: ScoreBubbleProps) => {
  return (
    <div className='score-bubble'>
      <span className='score-score'>{Math.floor(score)}%</span> {label}
    </div>
  );
};

export default ScoreBubble;

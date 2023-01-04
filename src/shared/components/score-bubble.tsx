import React from "react";
import "./bubble.css";

type ScoreBubbleProps = {
  /**
   * without percent-sign
   */
  score: number | undefined;
  label?: string;
};

const ScoreBubble = ({
  score,
  label = "Accessibility Score",
}: ScoreBubbleProps) => {
  return (
    <div className='score-bubble'>
      {score ? (
        <>
          <span className='score-score'>{Math.floor(score)}%</span> {label}
        </>
      ) : (
        "not scored yet"
      )}
    </div>
  );
};

export default ScoreBubble;

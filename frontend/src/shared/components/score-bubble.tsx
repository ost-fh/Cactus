import React from "react";
import Bubble from "./bubble";
import "./bubble.scss";

type ScoreBubbleProps = {
  score: number | undefined;
  label?: string;
  color?: "green" | "yellow" | "red" | "blue" | "green-light";
};

const ScoreBubble = ({
  score,
  label = "Cactus Score",
  color = "green",
}: ScoreBubbleProps) => {
  if (score === undefined) {
    return <Bubble label='not scored yet' />;
  }
  return <Bubble label={label} value={`${Math.floor(score)}%`} color={color} />;
};

export default ScoreBubble;

import React from "react";
import Bubble from "./bubble";

type CountBubbleProps = {
  count: number | undefined;
  label?: string;
};

const CountBubble = ({
  count,
  label = "components tested",
}: CountBubbleProps) => {
  const countString =
    count && (count < 1 ? count.toPrecision(2) : count.toString());

  return (
    <Bubble
      value={countString !== undefined ? countString : "undefined"}
      label={label}
    />
  );
};

export default CountBubble;

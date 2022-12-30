import React from "react";

type CountBubbleProps = {
  /**
   * without percent-sign
   */
  count: number;
  label?: string;
};

const CountBubble = ({
  count,
  label = "components tested",
}: CountBubbleProps) => {
  const countString = count < 1 ? count.toPrecision(2) : count.toString();

  return (
    <div className='count-bubble'>
      <span className='count-count'>{countString}</span> {label}
    </div>
  );
};

export default CountBubble;

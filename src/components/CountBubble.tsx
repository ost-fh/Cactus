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
  return (
    <div className='count-bubble'>
      <span className='count-count'>{count}</span> {label}
    </div>
  );
};

export default CountBubble;

import React from "react";

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
    <div className='count-bubble'>
      <span className='count-count'>
        {countString !== undefined ? countString : "undefined"}
      </span>{" "}
      {label}
    </div>
  );
};

export default CountBubble;

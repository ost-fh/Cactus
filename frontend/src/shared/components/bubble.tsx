import React from "react";
import "./bubble.scss";

type BubbleProps = {
  value?: React.ReactNode;
  label: string;
  color?: "none" | "green" | "green-light" | "yellow" | "red" | "blue";
};

const Bubble = ({ value, label, color = "none" }: BubbleProps) => {
  return (
    <div className={`bubble bubble-${color}`}>
      {value === undefined ? (
        label
      ) : (
        <>
          <span className='bubble-value'>{value}</span> {label}
        </>
      )}
    </div>
  );
};

export default Bubble;

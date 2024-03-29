import React from "react";
import "./bubble.scss";

export type BubbleProps = {
  value?: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  color?: "none" | "green" | "green-light" | "yellow" | "red" | "blue";
};

const Bubble = ({ value, label, color = "none", className }: BubbleProps) => {
  return (
    <div className={`bubble bubble-${color} ${className || ""}`}>
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

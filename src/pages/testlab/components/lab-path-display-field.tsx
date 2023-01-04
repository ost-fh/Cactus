import React from "react";

type LabPathDisplayFieldProps = {
  active: boolean;
  label: string;
  step: number;
};

const LabPathDisplayField = ({
  step,
  active,
  label,
}: LabPathDisplayFieldProps) => {
  return (
    <div
      className={`path-element ${active && "path-element-active"}`}
      aria-current={active ? "page" : "false"}
    >
      <div className='number-circle'>{step}</div>
      {label}
    </div>
  );
};

export default LabPathDisplayField;

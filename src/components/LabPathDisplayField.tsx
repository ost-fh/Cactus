import React from "react";

type LabPathDisplayFieldProps = {
  active: boolean;
  label: string;
};

const LabPathDisplayField = ({ active, label }: LabPathDisplayFieldProps) => {
  return (
    <div
      className={`path-element ${active && "path-element-active"}`}
      aria-current={active ? "page" : "false"}
    >
      {label}
    </div>
  );
};

export default LabPathDisplayField;

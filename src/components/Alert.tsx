import React from "react";
import "./alert.css";

type AlertProps = {
  title?: string;
  message: string;
  /** Allowed types: error, info, help */
  type?: string;
};

const Alert = ({ title, message, type = "info" }: AlertProps) => {
  if (type !== "info" && type !== "error" && type !== "help") {
    throw new Error("invalid alert type");
  }
  return (
    <div className={`alert-${type} alert`}>
      <strong>{title}</strong> {message}
    </div>
  );
};

export default Alert;

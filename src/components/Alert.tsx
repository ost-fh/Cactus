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
    console.log(type);

    throw new Error();
  }
  return (
    <div className={`alert-${type} alert`}>
      <strong>{title}</strong> {message}
    </div>
  );
};

export default Alert;

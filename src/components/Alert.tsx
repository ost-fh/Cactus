import React from "react";
import "./alert.css";

type AlertProps = {
  message: string;
  /** Allowed types: error, info, help */
  type?: string;
};

const Alert = ({ message, type = "info" }: AlertProps) => {
  if (type !== ("info" || "error" || "help")) throw new Error();
  return <div className={`alert-${type} alert`}>{message}</div>;
};

export default Alert;

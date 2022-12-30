import React from "react";
import {
  BsFillExclamationOctagonFill,
  BsFillExclamationTriangleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import "./alert.css";

type AlertProps = {
  title?: string;
  message?: string;
  /** Allowed types: error, info, help */
  type?: string;
  children?: any;
};

const Alert = ({ title, message, type = "info", children }: AlertProps) => {
  if (type !== "info" && type !== "error" && type !== "help") {
    throw new Error("invalid alert type");
  }
  if (children) {
    return <div className={`alert-${type} alert`}>{children}</div>;
  }

  return (
    <div className={`alert-${type} alert`}>
      {type === "error" && <BsFillExclamationOctagonFill />}
      {type === "help" && <BsFillExclamationTriangleFill />}
      {type === "info" && <BsInfoCircleFill />} <strong>{title}</strong>{" "}
      {message}
    </div>
  );
};

export default Alert;

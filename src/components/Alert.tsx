import React from "react";
import {
  BsCheckCircleFill,
  BsFillExclamationOctagonFill,
  BsFillExclamationTriangleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import "./alert.css";

type AlertProps = {
  title?: string;
  message?: string;
  type?: "info" | "error" | "help" | "success";
  children?: any;
};

const Alert = ({ title, message, type = "info", children }: AlertProps) => {
  if (children) {
    return <div className={`alert-${type} alert`}>{children}</div>;
  }

  return (
    <div className={`alert-${type} alert alert-with-icon`}>
      {type === "error" && <BsFillExclamationOctagonFill />}
      {type === "help" && <BsFillExclamationTriangleFill />}
      {type === "info" && <BsInfoCircleFill />}
      {type === "success" && <BsCheckCircleFill />}
      <strong>{title}</strong> <span>{message}</span>
    </div>
  );
};

export default Alert;

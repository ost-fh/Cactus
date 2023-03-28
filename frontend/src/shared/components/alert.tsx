import React from "react";
import {
  BsCheckCircleFill,
  BsFillExclamationOctagonFill,
  BsFillExclamationTriangleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import "./alert.scss";

type AlertProps = {
  title?: string;
  message?: string;
  type?: "info" | "error" | "help" | "success";
  className?: string;
  children?: any;
};

const Alert = ({
  title,
  message,
  type = "info",
  className,
  children,
}: AlertProps) => {
  if (children) {
    return (
      <div className={`alert-${type} alert ${className ? className : ""}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`alert-${type}  alert alert-with-icon ${
        className ? className : ""
      }`}
    >
      {type === "error" && (
        <BsFillExclamationOctagonFill title='Error Message:' />
      )}
      {type === "help" && (
        <BsFillExclamationTriangleFill title='Help Message:' />
      )}
      {type === "info" && <BsInfoCircleFill title='Information Message:' />}
      {type === "success" && <BsCheckCircleFill title='Success Message:' />}
      <p>
        <strong>{title}</strong> <span>{message}</span>
      </p>
    </div>
  );
};

export default Alert;

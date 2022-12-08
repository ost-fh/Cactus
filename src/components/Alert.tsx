import React from "react";
import "./alert.css";

type AlertProps = {
  message: string;
};

const Alert = (props: AlertProps) => {
  return <div className='alert-info'>{props.message}</div>;
};

export default Alert;

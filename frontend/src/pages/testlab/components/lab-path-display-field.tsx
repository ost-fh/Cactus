import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";

type LabPathDisplayFieldProps = {
  active: boolean;
  link?: boolean;
  done?: boolean;
  linkString: string;
  label: string;
  step: number;
};

const LabPathDisplayField = ({
  step,
  active,
  label,
  link,
  linkString,
  done = false,
}: LabPathDisplayFieldProps) => {
  if (link === true)
    return (
      <Link
        to={`../${linkString}`}
        className={`path-element ${
          active ? "path-element-active" : ""
        } path-link`}
        aria-current={active ? "page" : "false"}
      >
        {done && (
          <div className='circle-done'>
            <BsCheckLg />
          </div>
        )}
        {!done &&
          (active ? (
            <div className='circle-active'>{step}</div>
          ) : (
            <div className='number-circle'>{step}</div>
          ))}
        {label}
      </Link>
    );

  return (
    <div
      className={`path-element ${active && "path-element-active"}`}
      aria-current={active ? "step" : "false"}
    >
      {done && (
        <div className='circle-done'>
          <BsCheckLg />
        </div>
      )}
      {!done &&
        (active ? (
          <div className='circle-active'>{step}</div>
        ) : (
          <div className={`number-circle`}>{step}</div>
        ))}
      {label}
    </div>
  );
};

export default LabPathDisplayField;

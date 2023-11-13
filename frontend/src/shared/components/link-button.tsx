import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
  icon?: ReactElement;
  type?: "button" | "submit" | "reset";
  iconPosition?: "left" | "right";
  ariaLabel?: string;
};

const LinkButton = ({
  label,
  to,
  className,
  icon,
  type,
  iconPosition = "left",
  ariaLabel = undefined,
}: LinkButtonProps) => {
  return (
    <Link
      aria-label={ariaLabel}
      className={`button ${className ? className : ""} ${
        icon ? "button-with-icon" : ""
      }`}
      type={type}
      to={to}
    >
      {iconPosition === "left" ? icon : ""} {label}{" "}
      {iconPosition === "right" ? icon : ""}
    </Link>
  );
};

export default LinkButton;

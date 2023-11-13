import React, { ReactElement } from "react";

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
    <a
      aria-label={ariaLabel}
      className={`button ${className ? className : ""} ${
        icon ? "button-with-icon" : ""
      }`}
      type={type}
      href={to}
    >
      {iconPosition === "left" ? icon : ""} {label}{" "}
      {iconPosition === "right" ? icon : ""}
    </a>
  );
};

export default LinkButton;

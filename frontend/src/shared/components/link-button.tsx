import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <button
      aria-label={ariaLabel}
      className={`${className ? className : ""} ${
        icon ? "button-with-icon" : ""
      }`}
      type={type}
      onClick={() => navigate(to)}
    >
      {iconPosition === "left" ? icon : ""} {label}{" "}
      {iconPosition === "right" ? icon : ""}
    </button>
  );
};

export default LinkButton;

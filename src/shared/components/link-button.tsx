import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

const LinkButton = ({
  label,
  to,
  className,
  icon,
  disabled = false,
  type,
  ariaLabel = undefined,
}: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label={ariaLabel}
      className={`${className ? className : ""} ${icon && "button-with-icon"}`}
      disabled={disabled}
      type={type}
      onClick={() => navigate(to)}
    >
      {icon} {label}
    </button>
  );
};

export default LinkButton;

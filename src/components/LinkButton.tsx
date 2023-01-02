import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  type?: "button" | "submit" | "reset";
};

const LinkButton = ({
  label,
  to,
  className,
  icon,
  disabled = false,
  type,
}: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${className} ${icon && "button-with-icon"}`}
      disabled={disabled}
      type={type}
      onClick={() => navigate(to)}
    >
      {icon} {label}
    </button>
  );
};

export default LinkButton;

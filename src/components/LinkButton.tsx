import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
};

const LinkButton = ({
  label,
  to,
  className,
  icon,
  disabled = false,
}: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${className} ${icon && "button-with-icon"}`}
      disabled={disabled}
      onClick={() => navigate(to)}
    >
      {icon} {label}
    </button>
  );
};

export default LinkButton;

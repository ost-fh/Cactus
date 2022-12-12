import React from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
  disabled?: boolean;
};

const LinkButton = ({
  label,
  to,
  className,
  disabled = false,
}: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
};

export default LinkButton;

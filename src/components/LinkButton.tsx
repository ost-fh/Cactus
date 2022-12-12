import React from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  label: string;
  className?: string;
  to: string;
};

const LinkButton = ({ label, to, className }: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button className={className} onClick={() => navigate(to)}>
      {label}
    </button>
  );
};

export default LinkButton;

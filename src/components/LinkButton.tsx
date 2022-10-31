import React from "react";
import { useNavigate } from "react-router-dom";

type LinkButtonProps = {
  label: string;
  classname?: string;
  path: string;
};

const LinkButton = ({ label, path, classname }: LinkButtonProps) => {
  const navigate = useNavigate();
  return (
    <button className={classname} onClick={() => navigate(path)}>
      {label}
    </button>
  );
};

export default LinkButton;

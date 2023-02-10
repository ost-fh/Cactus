import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LogOutProps = {
  logOut: Function;
};

const LogOut = ({ logOut }: LogOutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    logOut();
    navigate("/");
  });

  return <div>please wait, you are redirected</div>;
};

export default LogOut;

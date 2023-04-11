import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../../shared/components/alert";
import PublicLayout from "../../shared/layout/public-layout";

type LogOutProps = {
  logOut: Function;
};

const LogOut = ({ logOut }: LogOutProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    logOut();
    const beforeLogoutUrl = searchParams.get("path");
    navigate(`${beforeLogoutUrl}?alert=logout` ?? "/");
  });

  return (
    <PublicLayout>
      <Alert type='info'>Please wait, you will be redirected</Alert>{" "}
    </PublicLayout>
  );
};

export default LogOut;

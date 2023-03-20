import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PublicLayout from "../../shared/layout/public-layout";
import "./login.scss";
import Heading from "../../shared/components/heading";
import Oauth from "../../shared/components/oauth";

const Login = (props: { setUserData: any }) => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    sessionStorage.setItem(
      "beforeLogin",
      searchParams.get("path")?.toString() || ""
    );
  }, [searchParams]);

  return (
    <PublicLayout activeLink='login'>
      <div className='login'>
        <Heading>Login</Heading>
        <Oauth />
      </div>
    </PublicLayout>
  );
};

export default Login;

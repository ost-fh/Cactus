import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import LinkButton from "../../shared/components/link-button";
import PublicLayout from "../../shared/layout/public-layout";
import { getUserProfile } from "../../shared/services/api";

const LoginRedirect = ({ setUserData }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  enum state {
    new,
    error,
    loading,
    success,
  }
  const [pageState, setPageState] = useState<state>(state.new);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pageState === state.loading || pageState === state.success) {
      return;
    }
    const accessToken = searchParams.get("accessToken");
    setPageState(state.loading);

    if (!accessToken) {
      setError("no accessToken");
      setPageState(state.error);
      return;
    }

    getUserProfile(accessToken)
      .then((user) => {
        const beforeLoginUrl = sessionStorage.getItem("beforeLogin");
        setUserData({ ...user, token: accessToken });
        setPageState(state.success);
        setTimeout(() => {
          console.log(beforeLoginUrl);

          navigate(
            beforeLoginUrl
              ? `${beforeLoginUrl}?alert=login`
              : "/contribute?alert=login"
          );
          sessionStorage.removeItem("beforeLogin");
        }, 10);
      })

      .catch(() => {
        setError("Invalid Token");
        setPageState(state.error);
      });
  }, [navigate, pageState, searchParams, setUserData, state]);

  return (
    <PublicLayout activeLink='login'>
      <Heading>Login in progress</Heading>
      <div aria-live='assertive'>
        {pageState === state.loading && (
          <Alert type='info' message={`Login in progress...`} />
        )}
        {pageState === state.error && (
          <>
            <Alert type='error' message={`Login failed: ${error}`} />
            <LinkButton
              to='/login'
              className='button-primary'
              label='Return to login page'
            />
          </>
        )}
        {pageState === state.success && (
          <>
            <Alert
              type='info'
              message='Login succeeded, you will be redirected in 3 seconds'
            />
            <LinkButton
              to='/libraries'
              className='button-primary'
              label='Go to the libraries overview'
            />
          </>
        )}
      </div>
    </PublicLayout>
  );
};

export default LoginRedirect;

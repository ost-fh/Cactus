import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  API_BASE_URL,
  getUserProfile,
  loginUser,
} from "../../shared/services/api";
import PublicLayout from "../../shared/layout/public-layout";
import "./login.css";
import Alert from "../../shared/components/alert";
import LinkButton from "../../shared/components/link-button";
import Heading from "../../shared/components/heading";

const Login = (props: { setUserData: any }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  enum state {
    new,
    error,
    loading,
    success,
  }

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      return;
    }

    props.setUserData({ token: accessToken });

    getUserProfile().then((user) => {
      props.setUserData({ ...user, token: accessToken });
      setFormState(state.success);
      setTimeout(() => navigate("/libraries"), 2500);
    });
  }, []);

  const [formState, setFormState] = useState<state>(state.new);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setFormError = (errorMessage: string) => {
    setError(errorMessage);
    setFormState(state.error);
    setPassword("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormState(state.loading);
    await loginUser({
      username,
      password,
    })
      .then((result) => {
        if (result.message) {
          setFormError(result.message);
        } else {
          props.setUserData(result);
          setFormState(state.success);
          setTimeout(() => navigate("/libraries"), 2500);
        }
      })
      .catch(() => {
        setFormError("Connection failed");
      });
  };

  return (
    <PublicLayout activeLink='login'>
      <div className='login'>
        <Heading noFocus>Login</Heading>
        {formState !== state.success && (
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='login-username'>Username</label>
            <input
              autoFocus
              required
              id='login-username'
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor='login-password'>Password</label>
            <input
              required
              id='login-password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='form-control-center'>
              <button className='button-primary' type='submit'>
                Log In
              </button>
              <br />
              <a href={`${API_BASE_URL}/auth/github`}>Continue with GitHub</a>
              <br />
              <a href={`${API_BASE_URL}/auth/google`}>Continue with Google</a>
            </div>
          </form>
        )}
        <div aria-live='assertive'>
          {formState === state.loading && (
            <Alert type='info' message={`Login in progress...`} />
          )}
          {formState === state.error && (
            <Alert type='error' message={`Login failed: ${error}`} />
          )}
          {formState === state.success && (
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
        <div>
          <Link to='/contribute'>
            Not registered yet? Click here to register
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;

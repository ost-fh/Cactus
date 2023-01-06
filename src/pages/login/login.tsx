import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../shared/services/api";
import PublicLayout from "../../shared/layout/public-layout";
import "./login.css";
import Alert from "../../shared/components/alert";
import LinkButton from "../../shared/components/link-button";
import Heading from "../../shared/components/heading";

const Login = (props: { setUserData: any }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  enum state {
    new,
    error,
    loading,
    success,
  }

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

        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor='login-username'>Username</label>
          <input
            autoFocus
            required
            id='login-username'
            type='text'
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor='login-password'>Password</label>
          <input
            required
            id='login-password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button className='button-primary' type='submit'>
              Log In
            </button>
          </div>
        </form>
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
      </div>
    </PublicLayout>
  );
};

export default Login;

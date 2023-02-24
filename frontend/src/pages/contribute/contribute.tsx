import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import { registerUser } from "../../shared/services/api";

const Contribute = (props: { setUserData: any }) => {
  const userData = useContext(UserContext);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState("new");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormState("loading");
    const loginData = { username: username, email: email, password: password };
    registerUser(loginData)
      .then((userData) => {
        props.setUserData(userData);
        setFormState("success");
      })
      .catch(() => setFormState("error"));
  };

  useEffect(() => {
    if (userData?.token) {
      if (formState === "new") {
        setFormState("logged_in");
      }
    }
  }, [formState, userData]);

  return (
    <PublicLayout activeLink='contribute'>
      <header>
        <Heading>Would you like to contribute?</Heading>
      </header>
      <h3>Rate libraries or expand the library list</h3>
      <div className='layout-split'>
        <div>
          <p>
            You can register now to help improving the catalogue of libraries
            and rated components.{" "}
          </p>
          <p>
            It would be best if you have a basic knowledge of web development
            and also a little knowledge of accessibility.
          </p>
        </div>
        <Alert type='help'>
          <h3>Registration</h3>
          <p>Please register to be able to contribute to Project Cactus.</p>

          {formState === "new" && (
            <form className='form' onSubmit={handleSubmit}>
              <label htmlFor='registration-username'>
                Username <small>(you will use this to login)</small>
              </label>
              <input
                required
                id='registration-username'
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='registration-email'>Email</label>
              <input
                required
                id='registration-email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='registration-password'>Password</label>
              <input
                required
                id='registration-password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='form-control-center'>
                <button className='button-primary' type='submit'>
                  Register
                </button>
              </div>
            </form>
          )}
          <div aria-live='assertive'>
            {formState === "loading" && <Alert message='Please wait...' />}
            {formState === "error" && (
              <Alert
                type='error'
                message='Something went wrong. Please try again later.'
              />
            )}
            {formState === "success" && (
              <Alert type='success'>
                You are logged in now. Go to{" "}
                <Link to={"/libraries"}>libraries</Link> to add new libraries
                and tests.
              </Alert>
            )}
          </div>
          {formState === "logged_in" && (
            <Alert message='You are already registered and logged in' />
          )}
        </Alert>
      </div>
      <h3>Expand and discuss criteria catalogue</h3>
      <p>https://github.com/ost-fh/Cactus</p>
    </PublicLayout>
  );
};

export default Contribute;

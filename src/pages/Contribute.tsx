import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Alert from "../components/Alert";
import PublicLayout from "../layout/PublicLayout";
import { registerUser } from "../services/api";

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
      <div className='layout-split'>
        <div>
          <h2>Would you like to contribute?</h2>
          <p>
            You can register now to help us and the community to improve the
            catalogue of libraries and rated components.{" "}
          </p>
          <p>
            It would be best if you already have basic knowledge of web
            development and also a little knowledge of accessibility.
          </p>
        </div>
        <div>
          <h2>Registration</h2>
          <p>Please register to contribute to the Cactus Project</p>

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
              <div>
                <button className='button-primary' type='submit'>
                  Register
                </button>
              </div>
            </form>
          )}
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
              <Link to={"/libraries"}>libraries</Link> to add new libraries and
              tests.
            </Alert>
          )}
          {formState === "logged_in" && (
            <Alert message='You are already registered and logged in' />
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contribute;

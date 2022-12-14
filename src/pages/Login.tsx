import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import PublicLayout from "../layout/PublicLayout";
import "./login.css";

const Login = (props: { setUserData: any }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    }).then();
    props.setUserData(token);
    navigate("/libraries");
  };

  return (
    <PublicLayout activeLink='login'>
      <div className='login'>
        <h2>Please Log In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='login-username'>Username</label>
          <input
            id='login-username'
            type='text'
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor='login-password'>Password</label>
          <input
            id='login-password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Login;

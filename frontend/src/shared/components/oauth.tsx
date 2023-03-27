import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { API_BASE_URL } from "../services/api";

const Oauth = () => {
  return (
    <div
      className='oauth'
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <p>
        Please continue with one of the provided authentication services. By
        continuing, you agree are setting up a Cactus account and agree to our
        Privacy Policy.{" "}
      </p>
      <a
        href={`${API_BASE_URL}/auth/github`}
        className='button button-primary button-with-icon'
      >
        <BsGithub />
        Continue with Github
      </a>

      <a
        href={`${API_BASE_URL}/auth/google`}
        className='button button-primary button-with-icon'
      >
        <BsGoogle /> Continue with Google
      </a>
    </div>
  );
};

export default Oauth;

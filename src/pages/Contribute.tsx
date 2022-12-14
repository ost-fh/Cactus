import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Alert from "../components/Alert";
import PublicLayout from "../layout/PublicLayout";
import { registerUser } from "../services/api";

const Contribute = (props: { setUserData: any }) => {
  const userData = useContext(UserContext);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const loginData = { username: username, email: email, password: password };
    const userData = await registerUser(loginData);

    props.setUserData(userData);
    navigate("/libraries");
  };

  return (
    <PublicLayout activeLink='contribute'>
      <div className='layout-split'>
        <div>
          <h2>Would you like to contribute?</h2>
          <p>Blablabla</p>
        </div>
        <div>
          <h2>Registration</h2>
          <p>Please register to contribute to the Cactus Project</p>
          {!userData ? (
            <form onSubmit={handleSubmit}>
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
                <button type='submit'>Submit</button>
              </div>
            </form>
          ) : (
            <Alert message='You are already logged in' />
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contribute;

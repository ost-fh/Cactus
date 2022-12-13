import React, { useState } from "react";
import PublicLayout from "../layout/PublicLayout";

const Contribute = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [formValid, setFormValid] = useState(false);

  // verify formvalidity

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const loginData = { username: username, email: email, password: password };
    console.log(loginData);
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
          <form onSubmit={handleSubmit}>
            <label htmlFor='registration-username'>
              Username (you will use this to login)
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
        </div>
      </div>
    </PublicLayout>
  );
};

export default Contribute;

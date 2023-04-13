import React, { useContext } from "react";
import { UserContext } from "../../App";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import Oauth from "../../shared/components/oauth";

const Contribute = () => {
  const userData = useContext(UserContext);

  return (
    <PublicLayout activeLink='contribute'>
      <header>
        <Heading>Would you like to contribute?</Heading>
      </header>
      <div className='layout-split'>
        <div>
          <h3>Rate libraries or expand the library list</h3>
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
          <h3>Login &amp; Registration</h3>
          {userData ? <Alert message='You are already logged in' /> : <Oauth />}
        </Alert>
      </div>
      <h3>Add or modify a component and its criteria</h3>
      <p>
        The components and its criteria are described through yaml files
        directly in the source code of this{" "}
        <a href='https://github.com/ost-fh/Cactus'>GitHub repository</a>. But
        luckily the whole application is open source and therefore everyone is
        invited to contribute. This{" "}
        <a href='https://github.com/ost-fh/Cactus/blob/main/CONTRIBUTING.md'>
          manual
        </a>{" "}
        explains how you can contribute or give feedback.
      </p>
    </PublicLayout>
  );
};

export default Contribute;

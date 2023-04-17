import React, { useContext } from "react";
import { UserContext } from "../../App";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import Oauth from "../../shared/components/oauth";
import FAQ from "./parts/faq";
import "./contribute.scss";

const Contribute = () => {
  const userData = useContext(UserContext);
  sessionStorage.setItem("beforeLogin", "/contribute");

  return (
    <PublicLayout className='contribute' activeLink='contribute'>
      <header>
        <Heading>Would you like to contribute?</Heading>
        <div className='layout-split'>
          <section>
            <h3>Test the accessibility of components</h3>
            <p>
              Have a look at any library interesting to you. Add Component-Tests
              to on one hand verify for yourself, the results are valid, and on
              the other hand you can help.
            </p>
            <h3>Add new libraries and versions</h3>
            <p>
              If you need scores of a library that is not yet added? Just add
              the library and add some tests. If a library is only available in
              an old version, you can add the new major version.
            </p>
            {/* <p>
            It would be best if you have a basic knowledge of web development
            and also a little knowledge of accessibility.
          </p> */}
          </section>
          <Alert type='help'>
            <h3>Sign up here!</h3>
            {userData ? (
              <Alert message='You are already logged in' />
            ) : (
              <Oauth />
            )}
          </Alert>
        </div>
        <section>
          <h3>Add or modify a component and its criteria</h3>
          <p>
            The components and its criteria are described through yaml files
            directly in the source code of this{" "}
            <a href='https://github.com/ost-fh/Cactus'>GitHub repository</a>.
            But luckily the whole application is open source and therefore
            everyone is invited to contribute. This{" "}
            <a href='https://github.com/ost-fh/Cactus/blob/main/CONTRIBUTING.md'>
              manual
            </a>{" "}
            explains how you can contribute or give feedback.
          </p>
        </section>
      </header>
      <hr />
      <FAQ />
    </PublicLayout>
  );
};

export default Contribute;

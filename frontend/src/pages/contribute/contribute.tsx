import React, { useContext } from "react";
import { UserContext } from "../../App";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import Oauth from "../../shared/components/oauth";
import "./contribute.scss";
import { Link } from "react-router-dom";

const Contribute = () => {
  const userData = useContext(UserContext);
  sessionStorage.setItem("beforeLogin", "/contribute");

  return (
    <PublicLayout className='contribute' activeLink='contribute'>
      <header>
        <Heading>Would you like to Contribute?</Heading>
        <div className='layout-split'>
          <section>
            <h3>Test the Accessibility of Components</h3>
            <p>
              Add component tests to libraries that are interesting to you. This
              way you can verify the results for yourself, understand how it is
              scored and you help other people by increasing the testquality. To
              do this, go to the <Link to={"/libraries"}>library overview</Link>
              , open a library and add a test.
            </p>
            <h3>Add new Libraries and Versions</h3>
            <p>
              Do you need scores of a library but you could not find it on
              Cactus? Just add the library and then add some tests. If a library
              is only available in an old version, you can add the new major
              version.
            </p>
          </section>
          <Alert type='help'>
            <h3>Sign up here!</h3>
            {userData ? (
              <Alert message='You are already logged in. Go add some tests to a library!' />
            ) : (
              <Oauth />
            )}
          </Alert>
        </div>
        <section>
          <h3>Advanced: Add or Change the Criteria Catalogue</h3>
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
    </PublicLayout>
  );
};

export default Contribute;

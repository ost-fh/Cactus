import React from "react";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";

const NotFound = () => {
  return (
    <PublicLayout>
      <Alert type='error'>
        <Heading>Error 404: Page not Found!</Heading>
      </Alert>
    </PublicLayout>
  );
};

export default NotFound;

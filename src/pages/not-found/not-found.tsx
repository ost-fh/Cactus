import React from "react";
import Alert from "../../shared/components/alert";
import PublicLayout from "../../shared/layout/public-layout";

const NotFound = () => {
  return (
    <PublicLayout>
      <Alert message='Error 404: Page Not Found' />
    </PublicLayout>
  );
};

export default NotFound;

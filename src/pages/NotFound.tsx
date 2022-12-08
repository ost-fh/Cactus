import React from "react";
import Alert from "../components/Alert";
import PublicLayout from "../layout/PublicLayout";

const NotFound = () => {
  return (
    <PublicLayout>
      <Alert message='Error 404: Page Not Found' />
    </PublicLayout>
  );
};

export default NotFound;

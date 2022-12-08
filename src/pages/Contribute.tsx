import React from "react";
import PublicLayout from "../layout/PublicLayout";

const Contribute = () => {
  return (
    <PublicLayout activeLink='contribute'>
      <div className='page-header-center'>
        <h1>Would you like to contribute?</h1>
        <h2>Register now!</h2>
      </div>
      <div className='alert-info'>This page is under development.</div>
    </PublicLayout>
  );
};

export default Contribute;

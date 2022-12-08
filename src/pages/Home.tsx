import React from "react";
import Alert from "../components/Alert";
import PublicLayout from "../layout/PublicLayout";

const home = () => {
  return (
    <PublicLayout activeLink='home'>
      <div className='home-intro'>
        <h2>Welcome to Project Cactus</h2>
        <p>
          We provide a Platform to test and provide results to qualify UI
          libraries in terms of accessibility.
        </p>
      </div>
      <Alert message='This page is under development.' />
    </PublicLayout>
  );
};

export default home;

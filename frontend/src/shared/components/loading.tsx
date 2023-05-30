import React from "react";
import { ImSpinner8 } from "react-icons/im";
import "./loading.scss";

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <div className='text'>
        {" "}
        <ImSpinner8 className='spinner' /> Loading...
      </div>
    </div>
  );
};

export default LoadingSpinner;

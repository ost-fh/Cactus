import React from "react";
import LinkButton from "../components/LinkButton";

const Start = () => {
  return (
    <div className='lab-start'>
      Start
      <label>Choose Component</label>
      <input type='dropdown' />
      <label>Choose Testmode</label>
      <input type='dropdown' />
      <LinkButton path='test' label='Start Test'></LinkButton>
    </div>
  );
};

export default Start;

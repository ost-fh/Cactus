import React from "react";
import LinkButton from "../components/LinkButton";

const Start = () => {
  return (
    <div className='lab-start'>
      <div className='alert-info'>
        Choose Component and Testmode to continue
      </div>
      <form>
        <label>Choose Component</label>
        <input type='dropdown' />
        <label>Choose Testmode</label>
        <input type='dropdown' />
        <div className='form-control'>
          <LinkButton path='test' label='Start Test'></LinkButton>
        </div>
      </form>
    </div>
  );
};

export default Start;

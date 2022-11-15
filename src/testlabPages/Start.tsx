import React from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import Test from "./Test";

const Start = () => {
  const { id, version } = useParams();
  console.log(id, version);

  return (
    <div className='lab-start'>
      <div className='alert-info'>
        Choose Component and Testmode to continue
      </div>
      <p>id: {id}</p>
      <p>version: {version} </p>
      <form>
        <label>Choose Component</label>
        <input type='dropdown' />
        <label>Choose Testmode</label>
        <input type='dropdown' />
        <div className='form-control'>
          <button>Start Test</button>
        </div>
      </form>
      {/* Pass Testinfos to test component */}
      <Test></Test>
    </div>
  );
};

export default Start;

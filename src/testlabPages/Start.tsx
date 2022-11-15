import React from "react";
import { useParams } from "react-router-dom";
import { criteriaCatalogue } from "../types";
import Test from "./Test";

type testDataType = {
  libraryId: string;
  component: string;
  testtype: string;
  criteriaGroup: object;
};

const Start = () => {
  const { id, version } = useParams();
  console.log(id, version);

  const criteriaData = criteriaCatalogue;
  const components = criteriaData.map((item) => item.name);
  const testmodes = ["Screenreader", "Keyboard"];
  console.log(components);

  return (
    <div className='lab-start'>
      <div className='alert-info'>
        Choose Component and Testmode to continue
      </div>
      <p>id: {id}</p>
      <p>version: {version} </p>
      <form>
        <label htmlFor='components'>Choose Component</label>
        <select name='components' id='components'>
          {components.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <label htmlFor='testmode'>Choose Testmode</label>
        <select name='testmode' id='testmode'>
          {testmodes.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
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

import React, { useEffect } from "react";
import LinkButton from "../components/LinkButton";
import { criteriaCatalogue, testData } from "../types";

type StartProps = {
  testData: testData;
  setTestData: Function;
};

const Start = ({ testData, setTestData }: StartProps) => {
  const criteriaData = criteriaCatalogue;
  const components = criteriaData.map((item) => item.component);
  const testModes = ["Screenreader", "Keyboard"];

  useEffect(() => {
    // Fills testData with default values
    let newTestData = testData;
    if (testData.component === "") {
      newTestData = { ...newTestData, component: components[0] };
    }
    if (testData.testMode === "") {
      newTestData = { ...newTestData, testMode: testModes[0] };
    }
    setTestData(newTestData);
    return () => {};
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTestData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(value);
    console.log(testData);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(testData);
  };

  return (
    <div className='lab-start'>
      <div className='alert-info'>
        Choose Component and Testmode to continue
      </div>
      <form>
        <label htmlFor='components'>Choose Component</label>
        <select
          name='component'
          value={testData.component}
          id='components'
          onChange={handleChange}
        >
          {components.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <label htmlFor='testMode'>Choose Testmode</label>
        <select
          name='testMode'
          id='testMode'
          value={testData.testMode}
          onChange={handleChange}
        >
          {testModes.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <div className='form-control'>
          {/* <button onClick={handleSubmit}>Start Test</button> */}
          <LinkButton label='Start Test' path='test'></LinkButton>
        </div>
      </form>
      {/* Pass Testinfos to test component */}
      {/* <Test></Test> */}
    </div>
  );
};

export default Start;

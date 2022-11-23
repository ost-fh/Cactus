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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components, setTestData, testData]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTestData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(value);
    console.log(testData);
  };

  return (
    <div className='lab-start'>
      <div className='alert-info'>
        Choose Component and Testmode to continue
      </div>
      <div className='form'>
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
          <LinkButton
            label='Next'
            classname='button-primary'
            path='instructions'
          ></LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Start;

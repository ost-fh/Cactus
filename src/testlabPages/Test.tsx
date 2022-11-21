import React, { useEffect, useState } from "react";
import LinkButton from "../components/LinkButton";
import TestItem from "../components/TestItem";
import { criteriaGroup, testData } from "../types";

// const criteria = [
//   {
//     _id: "123",
//     text: "focus style is visible",
//     help: "Hier steht hilfetext",
//   },
//   {
//     _id: "1243",
//     text: "buttons are focusable",
//     help: "Hier steht hilfetext",
//   },
//   {
//     _id: "12325",
//     text: "Other Things are focusable",
//     help: "Hier steht hilfetext",
//   },
// ];

// const criteriaGroup = {
//   videoLink: "test.com",
//   instructions: "This is how you test a Dialog.",
//   additionalHint: "mode: keyboard use Hinweis",
//   criteria: criteria,
// };

// const testData = {
//   libraryId: "234214",
//   library: {}, // fetch from server
//   component: "Dialog",
//   testtype: "Keyboard",
//   criteriaGroup: criteriaGroup,
// };

type criteriumResult = {
  _id: string;
  text: string;
  help: string;
  choice: string;
  comment: string;
};

// Library Data import -> title, links ...

type TestProps = {
  testData: testData;
  linkDocs: string;
};

const Test = ({ testData, linkDocs }: TestProps) => {
  const [testResult, setTestResult] = useState<criteriumResult[]>();

  useEffect(() => {
    const results = testData.criteriaGroup?.criteria.map((criterium: any) => {
      const result = { ...criterium, choice: "", comment: "" };
      return result;
    });
    setTestResult(results);
    return () => {};
  }, [testData.criteriaGroup?.criteria]);

  const handleChange = (newCriteriumData: criteriumResult) => {
    //console.log(newCriteriumData);
    if (testResult) {
      const newResults = testResult.map((result) => {
        //console.log(result._id, newCriteriumData._id);
        if (result._id === newCriteriumData._id) {
          result = newCriteriumData;
        }
        return result;
      });
      //console.log(newResults);

      setTestResult(newResults);
    }
  };

  const submitTest = () => {
    if (testResult) {
      testResult.forEach((element) => {
        if (element.choice === "") {
          console.log("empty choice");
        }
      });
    }
    console.log(testResult);
  };

  return (
    <div className='component-test'>
      <div className='test-general'>
        <p>Component: {testData.component} </p>
        <p>Testmode: {testData.testMode} </p>
        <a href={linkDocs} className='button' target='_blank' rel='noreferrer'>
          Open documentation
        </a>
        {/* <LinkButton path={"test"} label='Open documentation in new window' /> */}
      </div>
      {testData.criteriaGroup && (
        <>
          {testData.criteriaGroup.additionalHint === "" ? (
            ""
          ) : (
            <div className='alert-info'>
              {testData.criteriaGroup.additionalHint}
            </div>
          )}
          <div className='test-instructions'>
            <h3>Instructions</h3>
            {testData.criteriaGroup.instructions}
            <div>video: {testData.criteriaGroup.videoLink} </div>
          </div>
          <section className='test-list'>
            {testResult &&
              testResult.map((criterium) => (
                <TestItem
                  key={criterium._id}
                  criterium={criterium}
                  handleChange={handleChange}
                />
              ))}
          </section>
        </>
      )}
      <button onClick={submitTest} type='submit'>
        Finish Test
      </button>
    </div>
  );
};

export default Test;

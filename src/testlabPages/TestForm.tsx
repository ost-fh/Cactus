import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTestResult } from "../services/api";
import { UserContext } from "../App";
import LabPathDisplay from "../components/LabPathDisplay";
import LinkButton from "../components/LinkButton";
import TestItem from "../components/TestItem";
import { criteriumResult, testData } from "../types";
import { criteriaCatalogue } from "../services/criteria";

// Library Data import -> title, links ...

type TestFormProps = {
  testData: testData;
  linkDocs: string;
};

const TestForm = ({ testData, linkDocs }: TestFormProps) => {
  const userData = useContext(UserContext);

  const criteriaGroup = criteriaCatalogue
    .find((item) => item.component === testData.component)
    ?.criteria.find((item) => item.testMode === testData.testMode);

  const navigate = useNavigate();

  const [testResult, setTestResult] = useState<criteriumResult[]>();
  const [testFormValid, setTestFormValid] = useState(false);

  useEffect(() => {
    if (criteriaGroup) {
      const results = criteriaGroup.criteria.map((criterium: any) => {
        const result = { ...criterium, choice: "", comment: "" };
        return result;
      });
      setTestResult(results);
    }
    return () => {};
  }, [criteriaGroup]);

  // Check if form is vaild
  useEffect(() => {
    let formValid = true;
    if (testResult) {
      testResult.forEach((element) => {
        if (element.choice === "") {
          formValid = false;
        }
      });
      setTestFormValid(formValid);
    }
  }, [testResult]);

  const handleChange = (newCriteriumData: criteriumResult) => {
    if (testResult) {
      const newResults = testResult.map((result) => {
        if (result._id === newCriteriumData._id) {
          result = newCriteriumData;
        }
        return result;
      });
      setTestResult(newResults);
    }
  };

  const submitTest = () => {
    if (testResult) {
      postTestResult(
        { testData: testData, criteria: testResult },
        userData!.token
      );
      navigate("../confirmation");
    }
  };

  return (
    <div className='component-test'>
      <LabPathDisplay currentPage='test' />

      <div className='test-general'>
        <p>
          Open the documentation besides the testlab-window. Navigate to the
          documentation page of {testData.component}.
        </p>
        <p>
          <a
            href={linkDocs}
            className='button'
            target='_blank'
            rel='noreferrer'
          >
            Open documentation
          </a>
        </p>
        {testData.testMode === "screenreader" && (
          <p>
            To test with a screenreader, please have NVDA ready and use Chrome.
            This way, we will have reproducible results.
          </p>
        )}
        <p>
          Then check if the criteria apply to an interactive example of the
          component.
        </p>
        <p>
          Please use the keyboard to test the criteria (tab, enter, esc, space,
          arrows).
        </p>
      </div>
      {criteriaGroup && (
        <>
          <div>
            {criteriaGroup.additionalHint === "" ? (
              ""
            ) : (
              <div className='alert-info'>{criteriaGroup.additionalHint}</div>
            )}
          </div>
          {criteriaGroup.instructions !== "" && (
            <div className='test-instructions'>
              <h3>Instructions</h3>
              {criteriaGroup.instructions}
              {criteriaGroup.videoLink === "" ? (
                ""
              ) : (
                <div>video: {criteriaGroup.videoLink} </div>
              )}
            </div>
          )}
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
      <div className='control-group'>
        <LinkButton label='Back' to={"../specify"} />
        <button
          className='button-primary'
          disabled={!testFormValid}
          onClick={submitTest}
          type='submit'
        >
          Finish Test
        </button>
        {!testFormValid && (
          <p className='text-red'>Please answer all criteria.</p>
        )}
      </div>
    </div>
  );
};

export default TestForm;

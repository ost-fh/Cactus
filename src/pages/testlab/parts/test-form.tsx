import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postTestResult } from "../../../shared/services/api";
import { UserContext } from "../../../App";
import LinkButton from "../../../shared/components/link-button";
import { criteriumResult, testData } from "../../../shared/resources/types";
import { criteriaCatalogue } from "../../../shared/resources/criteria";
import Alert from "../../../shared/components/alert";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LabPathDisplay from "../components/lab-path-display";
import TestItem from "../components/test-item";

type TestFormProps = {
  testData: testData;
  linkDocs: string;
};

const TestForm = ({ testData, linkDocs }: TestFormProps) => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  const [testResult, setTestResult] = useState<criteriumResult[]>();

  // get the relevant criteria-group
  const criteriaGroup = criteriaCatalogue
    .find((item) => item.component === testData.component)
    ?.criteria.find((item) => item.testMode === testData.testMode);

  // transform criteria in criteria with results (criteriumResult). save in testResult
  useEffect(() => {
    if (criteriaGroup && !testResult) {
      const results = criteriaGroup.criteria.map((criterium: any) => {
        const result = { ...criterium, choice: "", comment: "" };
        return result;
      });
      setTestResult(results);
    }
    return () => {};
  }, [criteriaGroup, testResult]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (testResult) {
      // console.log({ testData: testData, criteria: testResult });
      postTestResult(
        { testData: testData, criteria: testResult },
        userData!.token
      );
      navigate("../confirmation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='component-test'>
      <LabPathDisplay currentPage='test' />

      <Alert type='help'>
        <h3>Instructions</h3>
        <p>
          Open the documentation besides the testlab-window. Navigate to the
          documentation page of <strong>{testData.component}</strong>.
        </p>
        {testData.alternativeComponentNames !== "" &&
          testData.alternativeComponentNames !== undefined && (
            <p>
              Alternative name(s) for the component could be:{" "}
              <strong>{testData.alternativeComponentNames}</strong>
            </p>
          )}

        <p>
          <a
            href={linkDocs}
            className='button button-primary'
            target='_blank'
            rel='noreferrer'
          >
            Open documentation
          </a>
        </p>
        {testData.testMode === "Screenreader" && (
          <p>
            To test with a screenreader, please have <strong>NVDA</strong> ready
            and use <strong>Chrome</strong>. This way, we will have reproducible
            results. If you're on Mac, you can use{" "}
            <a href='https://assistivlabs.com/sign-up'>AssistivLabs</a> (14 days
            free, sign-up required).
          </p>
        )}
        <p>
          Then check if the criteria apply to an interactive example of the
          component.
        </p>
        <p>
          Please use the keyboard to test the criteria (tab, enter, esc, space,
          arrow keys).
        </p>
        {criteriaGroup && criteriaGroup.additionalHint !== "" && (
          <p>{criteriaGroup.additionalHint}</p>
        )}
      </Alert>
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

      <div className='control-group'>
        <LinkButton
          type='button'
          label='Back'
          to={"../specify"}
          icon={<BsChevronLeft />}
        />
        <button
          type='submit'
          className='button-primary button-with-icon'
          // disabled={!testFormValid}
        >
          <BsChevronRight /> Finish Test
        </button>
      </div>
    </form>
  );
};

export default TestForm;

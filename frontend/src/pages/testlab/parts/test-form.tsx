import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComponents, postTestResult } from "../../../shared/services/api";
import LinkButton from "../../../shared/components/link-button";
import {
  componentCriteria,
  criteriaGroup,
  criterium,
  criteriumResult,
  testData,
} from "../../../shared/resources/types";
import Alert from "../../../shared/components/alert";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LabPathDisplay from "../components/lab-path-display";
import TestItem from "../components/test-item";
import Heading from "../../../shared/components/heading";

type TestFormProps = {
  testData: testData;
  linkDocs: string;
};

const TestForm = ({ testData, linkDocs }: TestFormProps) => {
  const navigate = useNavigate();

  const [testResult, setTestResult] = useState<criteriumResult[]>();
  const [criteriaGroup, setCriteriaGroup] = useState<criteriaGroup>();

  // transform criteria in criteria with results (criteriumResult). save in testResult
  useEffect(() => {
    if (criteriaGroup && !testResult) {
      const results = criteriaGroup.criteria.map((criterium: criterium) => {
        const result = { ...criterium, choice: "", comment: "" };
        return result;
      });
      setTestResult(results);
    }
    return () => {};
  }, [criteriaGroup, testResult]);

  // get the relevant criteria-group
  useEffect(() => {
    getComponents().then((items) => {
      const res: criteriaGroup = items // get the relevant criteria-group
        .find(
          (item: componentCriteria) => item.component === testData.component
        )
        ?.testModes.find(
          (item: criteriaGroup) => item.testMode === testData.testMode
        );
      setCriteriaGroup(res);
    });
  }, [testData.component, testData.testMode]);

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
      postTestResult({ testData: testData, criteria: testResult });
      navigate("../confirmation");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='lab-layout'>
      <LabPathDisplay currentPage='test' />
      <Heading>Testing the Component</Heading>
      <Alert type='help'>
        <h3>How to test:</h3>
        <p>
          Check if the criteria apply to an interactive example of the component
          inside the{" "}
          <a href={linkDocs} target='_blank' rel='noreferrer'>
            documentation
          </a>
          .
        </p>
        <p>
          Please use the keyboard to test the criteria (tab, enter, esc, space,
          arrow keys).
        </p>
        {criteriaGroup && criteriaGroup.additionalHint !== "" && (
          <p>{criteriaGroup.additionalHint}</p>
        )}
      </Alert>

      {testResult &&
        testResult.map((criterium) => (
          <TestItem
            key={criterium._id}
            criterium={criterium}
            handleChange={handleChange}
          />
        ))}

      <div className='control-group'>
        <LinkButton
          type='button'
          label='Back'
          to={"../prepare"}
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

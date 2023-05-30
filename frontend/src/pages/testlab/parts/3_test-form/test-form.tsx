import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getComponentCriteria,
  postTestResult,
} from "../../../../shared/services/api";
import LinkButton from "../../../../shared/components/link-button";
import {
  ComponentCriteria,
  CriteriaGroup,
  CriteriumResult,
} from "../../../../shared/resources/types";
import Alert from "../../../../shared/components/alert";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import LabPathDisplay from "../../components/lab-path-display";
import TestItem from "./test-item";
import Heading from "../../../../shared/components/heading";
import { TestDataContext } from "../../test-lab";

// type TestFormProps = {
//   testData: TestData;
//   linkDocs: string;
// };

const TestForm = () => {
  const navigate = useNavigate();

  const testData = useContext(TestDataContext);

  const [testResult, setTestResult] = useState<CriteriumResult[]>();
  const [criteriaGroup, setCriteriaGroup] = useState<CriteriaGroup>();
  const [error, setError] = useState("");

  // transform criteria in criteria with results (criteriumResult). save in testResult
  useEffect(() => {
    if (criteriaGroup && !testResult) {
      const results = criteriaGroup.criteria.map((criterium) => {
        const result = { ...criterium, choice: "", comment: "" };
        return result;
      });
      setTestResult(results);
    }
    return () => {};
  }, [criteriaGroup, testResult]);

  // get the relevant criteria-group
  useEffect(() => {
    getComponentCriteria().then((items) => {
      const result = items
        .find((item: ComponentCriteria) => item.name === testData.component)
        ?.testModes.find(
          (item: CriteriaGroup) => item.testMode === testData.testMode
        );
      setCriteriaGroup(result);
    });
  }, [testData.component, testData.testMode]);

  const handleChange = (newCriteriumData: CriteriumResult) => {
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
      postTestResult({ testData: testData, criteria: testResult })
        .then(() => {
          navigate("../confirmation");
        })
        .catch((e) => {
          console.error(e);
          setError("Submit failed.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} id='testlab-testform' className='lab-layout'>
      <LabPathDisplay currentPage='test' />
      <Heading visuallyHiddenPrefix='Step 1 of 4'>
        Testing the Component
      </Heading>
      <Alert type='help'>
        <h2>How to test:</h2>
        <p>
          Check if each criterium applies to an interactive example of the
          component in the documentation you opened in the previous page.
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

      {error !== "" && <Alert type='error' message={error} />}

      <div className='control-group'>
        <h2 className='visually-hidden'>Navigation</h2>

        <LinkButton
          type='button'
          label='Back'
          to={"../prepare"}
          icon={<BsChevronLeft />}
        />
        <button type='submit' className='button-primary button-with-icon'>
          <BsChevronRight /> Finish Test
        </button>
        {process.env.NODE_ENV === "development" && (
          <button type='button' onClick={() => navigate("../confirmation")}>
            DEV:skip
          </button>
        )}
      </div>
    </form>
  );
};

export default TestForm;

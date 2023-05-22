import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { postTestResult } from "../../../shared/services/api";
import { TestDataContext } from "../test-lab";

const Exclude = () => {
  const testData = useContext(TestDataContext);

  useEffect(() => {
    postTestResult({ testData: testData, criteria: [] }).catch((e) => {
      console.error(e);
    });
  });

  return <Navigate to='../confirmation?source=exclude' replace />;
};

export default Exclude;
